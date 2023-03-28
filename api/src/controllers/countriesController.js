const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

async function getCountries(req, res) {
  try {
    if (req.query.name) {
      const response = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.name}%`,
          },
        },
        include: [
          {
            model: Activity,
            through: {
              where: {
                countryId: req.params.idPais,
              },
            },
          },
        ],
      });
      res.status(200).json(response);
    } else if (req.query.onlyName) {
      const response = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.onlyName}%`,
          },
        },
        attributes: ["id", "name", "flagImg", "continent", "subRegion", "area", "population"],
      });
      res.status(200).json(response);
    } else {
      const dbResponse = await Country.findAll({ include: Activity });

      if (!dbResponse.length) {
        await axios.get("https://restcountries.com/v3/all").then((response) =>
          response.data.forEach(async (el) => {
            const newCountry = {
              id: el.cca3,
              name: el.name.common,
              flagImg: el.flags[1],
              continent: el.continents[0],
              subRegion: el.subregion,
              area: el.area,
              population: el.population,
            };
            if (el.capital) {
              newCountry.capital = el.capital[0];
            } else {
              newCountry.capital = "not found";
            }
            if (el.subregion) {
              newCountry.subRegion = el.subregion;
            } else {
              newCountry.subRegion = "not found";
            }

            await Country.create(newCountry);
          })
        );
        res.redirect("/countries");
      } else {
        res.status(200).json(dbResponse);
      }
    }
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
}

async function getActivitiesByCountryId(req, res) {
  try {
    const response = await Country.findAll({
      where: {
        id: req.params.idPais,
      },
      include: [
        {
          model: Activity,
          through: {
            where: {
              countryId: req.params.idPais,
            },
          },
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
}

module.exports = {
  getCountries,
  getActivitiesByCountryId,
};
