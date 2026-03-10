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
                          S.listItem()
                            .title("✏️ Bewerk Hoofdcategorie")
                            .child(S.document().schemaType("mainServicePage").documentId(mainId)),
                          S.divider(),
                          S.listItem()
                            .title("📄 Subcategorieën onder deze hoofdcategorie")
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
                                      S.listItem()
                                        .title("✏️ Bewerk Subcategorie")
                                        .child(S.document().schemaType("subServicePage").documentId(subId)),
                                      S.divider(),
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
                          S.listItem()
                            .title("✏️ Bewerk Subcategorie")
                            .child(S.document().schemaType("subServicePage").documentId(subId)),
                          S.divider(),
                          S.listItem()
                            .title("📁 Bekijk hoofdcategorie")
                            .child(
                              S.documentList()
                                .title("Hoofdcategorie")
                                .filter(`_type == "mainServicePage" && _id == *[_type == "subServicePage" && _id == $subId][0].mainCategory._ref`)
                                .params({ subId })
                            ),
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

              S.divider(),

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
                          S.listItem()
                            .title("✏️ Bewerk Service")
                            .child(S.document().schemaType("servicePage").documentId(serviceId)),
                          S.divider(),
                          S.listItem()
                            .title("📄 Bekijk subcategorie")
                            .child(
                              S.documentList()
                                .title("Subcategorie")
                                .filter(`_type == "subServicePage" && _id == *[_type == "servicePage" && _id == $serviceId][0].subCategory._ref`)
                                .params({ serviceId })
                            ),
                          S.listItem()
                            .title("📁 Bekijk hoofdcategorie")
                            .child(
                              S.documentList()
                                .title("Hoofdcategorie")
                                .filter(`_type == "mainServicePage" && _id == *[_type == "subServicePage" && _id == *[_type == "servicePage" && _id == $serviceId][0].subCategory._ref][0].mainCategory._ref`)
                                .params({ serviceId })
                            ),
                        ])
                    )
                ),

              S.divider(),

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
                  S.list()
                    .title("FAQ Items")
                    .items([
                      S.listItem()
                        .title("🚗 Particulier FAQ")
                        .child(S.documentList().title("Particulier FAQ").filter('_type == "faqItem" && category == "particulier"').defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
                      S.listItem()
                        .title("✈️ Schiphol FAQ")
                        .child(S.documentList().title("Schiphol FAQ").filter('_type == "faqItem" && category == "airport"').defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
                      S.listItem()
                        .title("🎉 Evenementen FAQ")
                        .child(S.documentList().title("Evenementen FAQ").filter('_type == "faqItem" && category == "evenementen"').defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
                      S.listItem()
                        .title("🏛️ Congres & Beurs FAQ")
                        .child(S.documentList().title("Congres & Beurs FAQ").filter('_type == "faqItem" && category == "congres"').defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
                      S.listItem()
                        .title("💼 Zakelijk FAQ")
                        .child(S.documentList().title("Zakelijk FAQ").filter('_type == "faqItem" && category == "zakelijk"').defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
                      S.listItem()
                        .title("🏢 Bedrijfsvervoer FAQ")
                        .child(S.documentList().title("Bedrijfsvervoer FAQ").filter('_type == "faqItem" && category == "bedrijfsvervoer"').defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
                      S.listItem()
                        .title("🎫 Tours FAQ")
                        .child(S.documentList().title("Tours FAQ").filter('_type == "faqItem" && category == "tours"').defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
                      S.listItem()
                        .title("🌍 Internationaal FAQ")
                        .child(S.documentList().title("Internationaal FAQ").filter('_type == "faqItem" && category == "internationaal"').defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
                      S.listItem()
                        .title("👑 VIP FAQ")
                        .child(S.documentList().title("VIP FAQ").filter('_type == "faqItem" && category == "vip"').defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
                      S.listItem()
                        .title("🏨 Hotelvervoer FAQ")
                        .child(S.documentList().title("Hotelvervoer FAQ").filter('_type == "faqItem" && category == "hotelvervoer"').defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
                      S.listItem()
                        .title("💰 Prijzen FAQ")
                        .child(S.documentList().title("Prijzen FAQ").filter('_type == "faqItem" && category == "pricing"').defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
                      S.listItem()
                        .title("📅 Boeken FAQ")
                        .child(S.documentList().title("Boeken FAQ").filter('_type == "faqItem" && category == "booking"').defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
                      S.listItem()
                        .title("📋 Alle FAQ Items")
                        .child(S.documentTypeList("faqItem").title("Alle FAQ Items").defaultOrdering([{ field: "sortOrder", direction: "asc" }])),
                    ])
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