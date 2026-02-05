// client/sanity/structure/index.ts
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ═══════════════════════════════════════════════════════
      // 🛠️ DIENSTEN
      // ═══════════════════════════════════════════════════════
      S.listItem()
        .title("🛠️ Diensten")
        .child(
          S.list()
            .title("Diensten")
            .items([
              // NIVEAU 1: Hoofdcategorieën
              S.listItem()
                .title("📁 Hoofdcategorieën")
                .child(
                  S.documentTypeList("serviceCategory")
                    .title("Alle Hoofdcategorieën")
                    .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                    .child((categoryId) =>
                      S.list()
                        .title("Hoofdcategorie opties")
                        .items([
                          // Bewerk de hoofdcategorie
                          S.listItem()
                            .title("✏️ Bewerk Hoofdcategorie")
                            .icon(() => "✏️")
                            .child(
                              S.document()
                                .schemaType("serviceCategory")
                                .documentId(categoryId)
                            ),

                          S.divider(),

                          // Toon alle subcategorieën onder deze hoofdcategorie
                          S.listItem()
                            .title("📄 Subcategorieën onder deze hoofdcategorie")
                            .icon(() => "📄")
                            .child(
                              S.documentList()
                                .title("Subcategorieën")
                                .filter('_type == "serviceSubCategory" && parentCategory._ref == $categoryId')
                                .params({ categoryId })
                                .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                            ),
                        ])
                    )
                ),

              // NIVEAU 2: Subcategorieën
              S.listItem()
                .title("📄 Subcategorieën")
                .child(
                  S.documentTypeList("serviceSubCategory")
                    .title("Alle Subcategorieën")
                    .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                    .child((subCategoryId) =>
                      S.list()
                        .title("Subcategorie opties")
                        .items([
                          // Bewerk de subcategorie
                          S.listItem()
                            .title("✏️ Bewerk Subcategorie")
                            .icon(() => "✏️")
                            .child(
                              S.document()
                                .schemaType("serviceSubCategory")
                                .documentId(subCategoryId)
                            ),

                          S.divider(),

                          // Toon de hoofdcategorie waar deze onder valt
                          S.listItem()
                            .title("📁 Bekijk hoofdcategorie")
                            .icon(() => "📁")
                            .child(
                              S.documentList()
                                .title("Hoofdcategorie")
                                .filter(`
                                  _type == "serviceCategory" && 
                                  _id == *[_type == "serviceSubCategory" && _id == $subCategoryId][0].parentCategory._ref
                                `)
                                .params({ subCategoryId })
                            ),
                        ])
                    )
                ),

              S.divider(),

              // Hierarchische navigatie
              S.listItem()
                .title("🔗 Blader door hiërarchie")
                .child(
                  S.documentTypeList("serviceCategory")
                    .title("1. Kies Hoofdcategorie")
                    .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                    .child((categoryId) =>
                      S.documentList()
                        .title("2. Kies Subcategorie")
                        .filter('_type == "serviceSubCategory" && parentCategory._ref == $categoryId')
                        .params({ categoryId })
                        .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                        .child((subCategoryId) =>
                          S.document()
                            .schemaType("serviceSubCategory")
                            .documentId(subCategoryId)
                        )
                    )
                ),
            ])
        ),

      S.divider(),

      // ═══════════════════════════════════════════════════════
      // 🏗️ PROJECTEN
      // ═══════════════════════════════════════════════════════
      S.listItem()
        .title("🏗️ Projecten")
        .child(
          S.documentTypeList("project")
            .title("Alle Projecten")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        ),

      S.divider(),

      // ═══════════════════════════════════════════════════════
      // REST
      // ═══════════════════════════════════════════════════════
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            "serviceCategory",
            "serviceSubCategory",
            "project",
          ].includes(item.getId() || "")
      ),
    ]);