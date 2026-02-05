// client/sanity/deskStructure.ts
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ═══════════════════════════════════════════════════════
      // 🛠️ DIENSTEN (3-tier systeem)
      // ═══════════════════════════════════════════════════════
      S.listItem()
        .title("🛠️ Diensten")
        .child(
          S.list()
            .title("Diensten")
            .items([
              // ─────────────────────────────────────────────────
              // NIVEAU 1: Hoofdcategorieën
              // ─────────────────────────────────────────────────
              S.listItem()
                .title("📁 Hoofdcategorieën (Niveau 1)")
                .child(
                  S.documentTypeList("mainServicePage")
                    .title("Alle Hoofdcategorieën")
                    .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                    .child((mainId) =>
                      S.list()
                        .title("Hoofdcategorie opties")
                        .items([
                          // Bewerk hoofdcategorie
                          S.listItem()
                            .title("✏️ Bewerk Hoofdcategorie")
                            .icon(() => "✏️")
                            .child(
                              S.document()
                                .schemaType("mainServicePage")
                                .documentId(mainId)
                            ),

                          S.divider(),

                          // Toon subcategorieën onder deze hoofdcategorie
                          S.listItem()
                            .title("📄 Subcategorieën onder deze hoofdcategorie")
                            .icon(() => "📄")
                            .child(
                              S.documentList()
                                .title("Subcategorieën (Niveau 2)")
                                .filter('_type == "subServicePage" && mainCategory._ref == $mainId')
                                .params({ mainId })
                                .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                                .child((subId) =>
                                  S.list()
                                    .title("Subcategorie opties")
                                    .items([
                                      // Bewerk subcategorie
                                      S.listItem()
                                        .title("✏️ Bewerk Subcategorie")
                                        .child(
                                          S.document()
                                            .schemaType("subServicePage")
                                            .documentId(subId)
                                        ),

                                      S.divider(),

                                      // Toon services onder deze subcategorie
                                      S.listItem()
                                        .title("📝 Services onder deze subcategorie")
                                        .child(
                                          S.documentList()
                                            .title("Services (Niveau 3)")
                                            .filter('_type == "servicePage" && subCategory._ref == $subId')
                                            .params({ subId })
                                            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                                        ),
                                    ])
                                )
                            ),
                        ])
                    )
                ),

              S.divider(),

              // ─────────────────────────────────────────────────
              // NIVEAU 2: Alle Subcategorieën (overzicht)
              // ─────────────────────────────────────────────────
              S.listItem()
                .title("📄 Alle Subcategorieën (Niveau 2)")
                .child(
                  S.documentTypeList("subServicePage")
                    .title("Alle Subcategorieën")
                    .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                    .child((subId) =>
                      S.list()
                        .title("Subcategorie opties")
                        .items([
                          // Bewerk subcategorie
                          S.listItem()
                            .title("✏️ Bewerk Subcategorie")
                            .icon(() => "✏️")
                            .child(
                              S.document()
                                .schemaType("subServicePage")
                                .documentId(subId)
                            ),

                          S.divider(),

                          // Bekijk hoofdcategorie
                          S.listItem()
                            .title("📁 Bekijk hoofdcategorie")
                            .icon(() => "📁")
                            .child(
                              S.documentList()
                                .title("Hoofdcategorie")
                                .filter(`
                                  _type == "mainServicePage" && 
                                  _id == *[_type == "subServicePage" && _id == $subId][0].mainCategory._ref
                                `)
                                .params({ subId })
                            ),

                          // Toon services onder deze subcategorie
                          S.listItem()
                            .title("📝 Services onder deze subcategorie")
                            .icon(() => "📝")
                            .child(
                              S.documentList()
                                .title("Services (Niveau 3)")
                                .filter('_type == "servicePage" && subCategory._ref == $subId')
                                .params({ subId })
                                .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                            ),
                        ])
                    )
                ),

              S.divider(),

              // ─────────────────────────────────────────────────
              // NIVEAU 3: Alle Services (overzicht)
              // ─────────────────────────────────────────────────
              S.listItem()
                .title("📝 Alle Services (Niveau 3)")
                .child(
                  S.documentTypeList("servicePage")
                    .title("Alle Services")
                    .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                    .child((serviceId) =>
                      S.list()
                        .title("Service opties")
                        .items([
                          // Bewerk service
                          S.listItem()
                            .title("✏️ Bewerk Service")
                            .icon(() => "✏️")
                            .child(
                              S.document()
                                .schemaType("servicePage")
                                .documentId(serviceId)
                            ),

                          S.divider(),

                          // Bekijk subcategorie
                          S.listItem()
                            .title("📄 Bekijk subcategorie")
                            .icon(() => "📄")
                            .child(
                              S.documentList()
                                .title("Subcategorie")
                                .filter(`
                                  _type == "subServicePage" && 
                                  _id == *[_type == "servicePage" && _id == $serviceId][0].subCategory._ref
                                `)
                                .params({ serviceId })
                            ),

                          // Bekijk hoofdcategorie
                          S.listItem()
                            .title("📁 Bekijk hoofdcategorie")
                            .icon(() => "📁")
                            .child(
                              S.documentList()
                                .title("Hoofdcategorie")
                                .filter(`
                                  _type == "mainServicePage" && 
                                  _id == *[_type == "subServicePage" && _id == *[_type == "servicePage" && _id == $serviceId][0].subCategory._ref][0].mainCategory._ref
                                `)
                                .params({ serviceId })
                            ),
                        ])
                    )
                ),

              S.divider(),

              // ─────────────────────────────────────────────────
              // HIERARCHISCHE NAVIGATIE
              // ─────────────────────────────────────────────────
              S.listItem()
                .title("🔗 Blader door hiërarchie")
                .child(
                  S.documentTypeList("mainServicePage")
                    .title("1. Kies Hoofdcategorie")
                    .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                    .child((mainId) =>
                      S.documentList()
                        .title("2. Kies Subcategorie")
                        .filter('_type == "subServicePage" && mainCategory._ref == $mainId')
                        .params({ mainId })
                        .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                        .child((subId) =>
                          S.documentList()
                            .title("3. Kies Service")
                            .filter('_type == "servicePage" && subCategory._ref == $subId')
                            .params({ subId })
                            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
                            .child((serviceId) =>
                              S.document()
                                .schemaType("servicePage")
                                .documentId(serviceId)
                            )
                        )
                    )
                ),
            ])
        ),

      S.divider(),

      // ═══════════════════════════════════════════════════════
      // 🎫 TOURS
      // ═══════════════════════════════════════════════════════
      S.listItem()
        .title("🎫 Tours")
        .child(
          S.documentTypeList("tourServicePage")
            .title("Alle Tours")
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
        ),

      S.divider(),

      // ═══════════════════════════════════════════════════════
      // 📚 HERBRUIKBARE CONTENT
      // ═══════════════════════════════════════════════════════
      S.listItem()
        .title("📚 Herbruikbare Content")
        .child(
          S.list()
            .title("Content")
            .items([
              S.listItem()
                .title("❓ FAQ Items")
                .child(
                  S.documentTypeList("faqItem")
                    .title("Alle FAQ Items")
                    .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
                ),
              S.listItem()
                .title("⭐ Reviews")
                .child(
                  S.documentTypeList("review")
                    .title("Alle Reviews")
                    .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
                ),
            ])
        ),

      S.divider(),

      // ═══════════════════════════════════════════════════════
      // OVERIGE DOCUMENT TYPES
      // ═══════════════════════════════════════════════════════
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            "mainServicePage",
            "subServicePage",
            "servicePage",
            "tourServicePage",
            "faqItem",
            "review",
          ].includes(item.getId() || "")
      ),
    ]);