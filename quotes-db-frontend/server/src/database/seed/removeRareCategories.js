// Remove from the DB all categories which appear in one or two quotes
const { QueryTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Category = require("../../models/Category");
const Quote = require("../../models/Quote");
const QuoteCategory = require("../../models/QuoteCategory");

async function removeRareCategories() {
  try {
    const rareCategories = await QuoteCategory.findAll({
      attributes: ["CategoryId"],
      group: ["CategoryId"],
      having: sequelize.literal("COUNT(*) <= 2"),
      raw: true,
      pluck: "CategoryId",
    });

    const rareCategoryIds = rareCategories.map(
      (category) => category.CategoryId
    );

    await Category.destroy({
      where: {
        id: rareCategoryIds,
      },
    });

    const quotesWithoutCategories = await sequelize.query(
      `SELECT "Quotes".*
       FROM "Quotes"
       LEFT JOIN "QuoteCategories" ON "Quotes".id = "QuoteCategories"."QuoteId"
       WHERE "QuoteCategories"."CategoryId" IS NULL;`,
      { type: QueryTypes.SELECT }
    );

    const quotesWithoutCategoriesIds = quotesWithoutCategories.map(
      (quote) => quote.id
    );

    await Quote.destroy({
      where: {
        id: quotesWithoutCategoriesIds,
      },
    });

    console.log("Rare categories removed successfully.");
  } catch (error) {
    console.error("Error removing rare categories:", error);
  }
}

removeRareCategories();
