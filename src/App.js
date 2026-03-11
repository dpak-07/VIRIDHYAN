import { useState, useRef, useMemo, useEffect } from "react";
import React from "react";

// ─── 100 PLANTS ────────────────────────────────────────────────────────────
const PLANTS = [
  {
    id: 1,
    name: "Ashwagandha",
    latin: "Withania somnifera",
    emoji: "🌿",
    color: "#5C7A4A",
    accent: "#A8C97F",
    region: "South Asia",
    era: "3000 BCE",
    ayush: "Ayurveda",
    tags: ["Adaptogen", "Stress Relief", "Immunity"],
    summary:
      "The ancient root of resilience, restoring vitality and calming the nervous system for 5,000 years.",
    history:
      "Mentioned in the Charaka Samhita, prescribed to restore energy in the elderly and convalescent.",
    traditional:
      "Root powder in warm milk given to new mothers, warriors, and those recovering from illness.",
    modern:
      "Reduces cortisol by 30%, improves athletic performance and cognition in randomized clinical trials.",
    future:
      "Withanolides under investigation as neuroprotective agents for Alzheimer's disease management.",
  },
  {
    id: 2,
    name: "Turmeric",
    latin: "Curcuma longa",
    emoji: "🟡",
    color: "#B8860B",
    accent: "#FFD700",
    region: "India & SE Asia",
    era: "2500 BCE",
    ayush: "Ayurveda",
    tags: ["Anti-inflammatory", "Antioxidant", "Digestive"],
    summary:
      "The golden spice bridging kitchen and clinic for 4,000 years, now at the frontier of oncology research.",
    history:
      "Used in Vedic culture as culinary spice and sacred dye — Sanskrit calls it haridra, the auspicious plant.",
    traditional:
      "Paste for wounds, golden milk for joints, incense in temples across South Asia.",
    modern:
      "Curcumin rivals ibuprofen in anti-inflammatory trials; nano-delivery systems advancing bioavailability.",
    future:
      "Nano-curcumin in Phase II clinical trials for pancreatic and colorectal cancer treatment.",
  },
  {
    id: 3,
    name: "Moringa",
    latin: "Moringa oleifera",
    emoji: "🌱",
    color: "#3D7A3D",
    accent: "#7EC850",
    region: "Sub-Saharan Africa",
    era: "2000 BCE",
    ayush: "Ayurveda",
    tags: ["Nutrition", "Antimicrobial", "Water Purification"],
    summary:
      "The miracle tree — more nutrients per gram than almost any plant, purifying water and fighting malnutrition.",
    history:
      "Ancient Egyptians prized moringa oil; Mauryan warriors relied on its leaves for battle stamina.",
    traditional:
      "Leaves for malnutrition, seeds for water purification, roots as potent tonic across traditions.",
    modern:
      "WHO solution for childhood malnutrition; seeds purify water 90-99% more effectively than standard methods.",
    future:
      "Biofortification programs target micronutrient deficiency in 2 billion people by 2035.",
  },
  {
    id: 4,
    name: "Neem",
    latin: "Azadirachta indica",
    emoji: "🍃",
    color: "#2E6B2E",
    accent: "#6BBF59",
    region: "Indian Subcontinent",
    era: "4500 BCE",
    ayush: "Ayurveda",
    tags: ["Antimicrobial", "Biopesticide", "Oral Health"],
    summary:
      "India's village pharmacy — one tree solving skin, soil, and systemic disease for 6,500 years.",
    history:
      "Pre-Indus Valley texts mention neem. Its twigs are the original toothbrushes, still used by 300M people.",
    traditional:
      "Leaves bathed newborns; seeds pressed for lamp oil; bark decocted for fever.",
    modern:
      "Azadirachtin approved in 80+ countries as a safe biopesticide replacing agrochemicals.",
    future:
      "Neem dental formulations and biodegradable pesticide startups receiving accelerated regulatory approval.",
  },
  {
    id: 5,
    name: "Holy Basil",
    latin: "Ocimum tenuiflorum",
    emoji: "☘️",
    color: "#4A7856",
    accent: "#85C785",
    region: "Tropical Asia",
    era: "1500 BCE",
    ayush: "Ayurveda",
    tags: ["Adaptogen", "Antimicrobial", "Sacred"],
    summary:
      "Tulsi — sacred adaptogen validated for immune modulation, anti-stress, and anti-diabetic activity.",
    history:
      "Cultivated in every Hindu household for 3,000 years as a divine protective plant.",
    traditional:
      "Chewed for oral health, brewed for respiratory illness, used in temple garlands.",
    modern:
      "24 human trials confirm immunomodulatory, anti-diabetic, and anti-inflammatory effects.",
    future:
      "Tulsi extracts entering functional beverages and the pharmaceutical adaptogen pipeline.",
  },
  {
    id: 6,
    name: "Brahmi",
    latin: "Bacopa monnieri",
    emoji: "💧",
    color: "#4A7890",
    accent: "#80B8D0",
    region: "India",
    era: "600 CE",
    ayush: "Ayurveda",
    tags: ["Cognitive", "Adaptogen", "Neuroprotective"],
    summary:
      "Ayurveda's supreme brain tonic, enhancing memory and intellect in scholars for 1,400 years.",
    history: "Atharva Veda documents brahmi for memorization of sacred texts.",
    traditional:
      "Ghee-infused leaves for children; scalp oil; tea for students and monks.",
    modern:
      "Bacosides A and B improve synaptic transmission in 12-week randomized controlled trials.",
    future:
      "Bacoside formulations in Phase II ADHD trials as non-stimulant cognitive enhancers.",
  },
  {
    id: 7,
    name: "Aloe Vera",
    latin: "Aloe barbadensis",
    emoji: "🪴",
    color: "#5A8A5A",
    accent: "#90C878",
    region: "Arabian Peninsula",
    era: "2200 BCE",
    ayush: "Ayurveda",
    tags: ["Skin Care", "Digestive", "Wound Healing"],
    summary:
      "The plant of immortality — aloe gel has soothed burns, wounds, and inflammation for millennia.",
    history:
      "Cleopatra used aloe gel as a daily moisturizer. Alexander the Great captured islands for aloe supply.",
    traditional:
      "Gel applied to burns and cuts; juice consumed for digestive ailments and liver detox.",
    modern:
      "FDA-approved aloe preparations for wound care; acemannan shows promising antiviral properties.",
    future:
      "Aloe-based edible coatings for fresh produce replacing single-use plastic packaging.",
  },
  {
    id: 8,
    name: "Shatavari",
    latin: "Asparagus racemosus",
    emoji: "🌾",
    color: "#5A8860",
    accent: "#90C890",
    region: "India & Himalayas",
    era: "2000 BCE",
    ayush: "Ayurveda",
    tags: ["Women's Health", "Adaptogen", "Hormonal"],
    summary:
      "She who has a hundred husbands — supreme tonic for female reproductive and hormonal health.",
    history:
      "Ayurvedic rasayana prescribed through all stages of a woman's life from puberty to menopause.",
    traditional:
      "Root powder in ghee or milk for fertility, lactation support, and menopause symptom relief.",
    modern:
      "Galactogogue effects confirmed; increases prolactin-mediated breast milk production in trials.",
    future:
      "Shatavarosides as selective estrogen receptor modulators for bone density preservation research.",
  },
  {
    id: 9,
    name: "Gotu Kola",
    latin: "Centella asiatica",
    emoji: "💚",
    color: "#3A7860",
    accent: "#70B898",
    region: "India & SE Asia",
    era: "1500 BCE",
    ayush: "Ayurveda",
    tags: ["Cognitive", "Skin Care", "Circulation"],
    summary:
      "Gotu kola — the fountain of youth herb connecting Ayurveda, TCM, and Southeast Asian medicine.",
    history:
      "Sri Lankan legend says elephants ate gotu kola for longevity; used in every Asian tradition.",
    traditional:
      "Leaves consumed as salad in SE Asia; used for wound healing and meditation clarity.",
    modern:
      "Asiaticosides accelerate collagen synthesis and improve microcirculation in clinical trials.",
    future:
      "Asiaticoside derivatives entering Alzheimer's trials for neurite growth stimulation potential.",
  },
  {
    id: 10,
    name: "Lavender",
    latin: "Lavandula angustifolia",
    emoji: "💜",
    color: "#7A5A9A",
    accent: "#C0A0E0",
    region: "Mediterranean",
    era: "2500 BCE",
    ayush: "Naturopathy",
    tags: ["Calming", "Antimicrobial", "Aromatherapy"],
    summary:
      "The purple healer — lavender calms the nervous system while its compounds fight bacteria and fungi.",
    history:
      "Romans used lavender to scent baths. The name derives from lavare, to wash.",
    traditional:
      "Sachets under pillows for sleep, oils for headaches, flowers in wound dressings.",
    modern:
      "Oral silexan (lavender oil) outperforms placebo for anxiety disorders in randomized trials.",
    future:
      "Linalool being explored as a non-addictive anxiolytic alternative to benzodiazepines.",
  },
  {
    id: 11,
    name: "Chamomile",
    latin: "Matricaria chamomilla",
    emoji: "🌼",
    color: "#C8A83A",
    accent: "#F0D060",
    region: "Europe & West Asia",
    era: "1550 BCE",
    ayush: "Naturopathy",
    tags: ["Calming", "Digestive", "Anti-inflammatory"],
    summary:
      "Europe's most beloved medicinal flower — calming, anti-inflammatory, and digestive for 3,500 years.",
    history:
      "Found in Ramesses II's tomb. Roman soldiers carried chamomile into battle.",
    traditional:
      "Steeped as tea for insomnia, colic, and anxiety; bathed in chamomile-infused water.",
    modern:
      "Apigenin binds GABA receptors — explaining its clinically validated anxiolytic effects.",
    future:
      "Apigenin under investigation as neuroprotective compound for cognitive decline prevention.",
  },
  {
    id: 12,
    name: "Peppermint",
    latin: "Mentha x piperita",
    emoji: "🌀",
    color: "#30786A",
    accent: "#60C0A8",
    region: "Europe",
    era: "1000 BCE",
    ayush: "Naturopathy",
    tags: ["Digestive", "Cooling", "Antimicrobial"],
    summary:
      "The cool breath of the plant world — soothing stomachs and clearing airways for 3,000 years.",
    history:
      "Dried peppermint found in Egyptian pyramids. Ancient Greeks used it to flavor wine.",
    traditional:
      "Leaves steeped for indigestion and nausea; crushed and inhaled for headaches.",
    modern:
      "Enteric-coated peppermint oil capsules recommended by gastroenterologists for IBS management.",
    future:
      "Menthol receptor (TRPM8) research opening pathways for chronic pain therapeutics.",
  },
  {
    id: 13,
    name: "Rosemary",
    latin: "Salvia rosmarinus",
    emoji: "🌿",
    color: "#4A7060",
    accent: "#80B090",
    region: "Mediterranean",
    era: "500 BCE",
    ayush: "Naturopathy",
    tags: ["Cognitive", "Antioxidant", "Circulatory"],
    summary:
      "The herb of remembrance — rosmarinic acid linked to memory enhancement since ancient Greece.",
    history:
      "Greek scholars wore rosemary garlands during exams. Shakespeare referenced it for remembrance.",
    traditional:
      "Burned for purification and memory; steeped for hair growth; applied for joint pain.",
    modern:
      "Inhaling rosemary essential oil improves cognitive performance in controlled studies.",
    future:
      "Carnosic acid being developed as neuroprotective agent for Parkinson's disease.",
  },
  {
    id: 14,
    name: "Fenugreek",
    latin: "Trigonella foenum-graecum",
    emoji: "🌾",
    color: "#8A7840",
    accent: "#C0A860",
    region: "Mediterranean & India",
    era: "4000 BCE",
    ayush: "Ayurveda",
    tags: ["Anti-diabetic", "Hormonal", "Digestive"],
    summary:
      "Ancient multi-tool — managing blood sugar, boosting lactation, and flavoring food for 6,000 years.",
    history:
      "Charred seeds found in Iraq dated 4000 BCE; Ebers Papyrus documents it for fever.",
    traditional:
      "Seeds soaked overnight for diabetes; ground into poultices; sprouted as galactogogue.",
    modern:
      "Galactomannan reduces fasting blood glucose and improves insulin sensitivity significantly.",
    future:
      "4-Hydroxyisoleucine being developed as pure insulin sensitizer for metabolic syndrome.",
  },
  {
    id: 15,
    name: "Lemon Balm",
    latin: "Melissa officinalis",
    emoji: "🍋",
    color: "#8A9A30",
    accent: "#C8D060",
    region: "Mediterranean",
    era: "300 BCE",
    ayush: "Naturopathy",
    tags: ["Calming", "Antiviral", "Cognitive"],
    summary:
      "The bee herb — Paracelsus called it the elixir of life, now validated for anxiety and memory.",
    history:
      "Paracelsus called lemon balm the elixir of life. Arab physicians used it for melancholy.",
    traditional:
      "Leaves steeped as tea for anxiety, insomnia, and palpitations.",
    modern:
      "Rosmarinic acid inhibits GABA transaminase, explaining anxiolytic effects confirmed in trials.",
    future:
      "Melissa extracts being studied for acetylcholinesterase inhibition in Alzheimer's prevention.",
  },
  {
    id: 16,
    name: "Ginger",
    latin: "Zingiber officinale",
    emoji: "🫚",
    color: "#C8782A",
    accent: "#F0B060",
    region: "SE Asia & India",
    era: "2000 BCE",
    ayush: "Ayurveda",
    tags: ["Digestive", "Anti-inflammatory", "Nausea"],
    summary:
      "The root of fire — the world's most traded spice-medicine for 4,000 years of civilization.",
    history:
      "Confucius ate fresh ginger with every meal. Arab traders monopolized ginger trade routes.",
    traditional:
      "Fresh root chewed for nausea; decocted for arthritis; boiled with honey for colds.",
    modern:
      "Clinically confirmed efficacy for chemotherapy nausea, morning sickness, and osteoarthritis.",
    future:
      "6-Gingerol being studied as anti-metastatic compound inhibiting cancer cell migration.",
  },
  {
    id: 17,
    name: "Amla",
    latin: "Phyllanthus emblica",
    emoji: "🟢",
    color: "#4A7A3A",
    accent: "#80B860",
    region: "India & SE Asia",
    era: "2500 BCE",
    ayush: "Ayurveda",
    tags: ["Antioxidant", "Immunity", "Rejuvenating"],
    summary:
      "Indian gooseberry — highest vitamin C in the plant kingdom and Ayurveda's supreme rasayana.",
    history:
      "First tree mentioned in Skanda Purana; cornerstone of Chyavanprash, the immortality formula.",
    traditional:
      "Fresh, dried, or pickled for immunity; used in hair oils; cornerstone of Ayurvedic tonics.",
    modern:
      "Contains 20× vitamin C of oranges; highest antioxidant capacity of any Indian food plant.",
    future:
      "Emblicanin A and B being developed for age-related macular degeneration treatment.",
  },
  {
    id: 18,
    name: "Calendula",
    latin: "Calendula officinalis",
    emoji: "🌼",
    color: "#E07030",
    accent: "#F09850",
    region: "Southern Europe",
    era: "1100 CE",
    ayush: "Naturopathy",
    tags: ["Skin Care", "Wound Healing", "Anti-inflammatory"],
    summary:
      "The pot marigold — golden healer whose petals have soothed skin and wounds for centuries.",
    history:
      "Medieval herbalists called it the herb of the sun. Civil War surgeons used it on battlefields.",
    traditional:
      "Petals infused in oil for skin conditions; tea brewed for digestive inflammation.",
    modern:
      "Calendula creams clinically superior to Vaseline for radiotherapy-induced dermatitis.",
    future:
      "Oleanolic acid glycosides entering trials for anti-tumor applications.",
  },
  {
    id: 19,
    name: "Elderberry",
    latin: "Sambucus nigra",
    emoji: "🫐",
    color: "#5A3A8A",
    accent: "#9070C0",
    region: "Europe",
    era: "400 BCE",
    ayush: "Naturopathy",
    tags: ["Antiviral", "Immunity", "Respiratory"],
    summary:
      "The elder tree — revered across European folklore; berries proven to compress flu duration by 3-4 days.",
    history:
      "Hippocrates called elder his medicine chest. Norse mythology honored it as home to spirits.",
    traditional:
      "Berries syruped for flu; flowers steeped for fever; bark used as gentle purgative.",
    modern:
      "Elderberry extract significantly reduces flu duration and severity in randomized trials.",
    future:
      "Cyanidin glycosides being studied for ability to block influenza A and B cell attachment.",
  },
  {
    id: 20,
    name: "Stevia",
    latin: "Stevia rebaudiana",
    emoji: "🍃",
    color: "#3A7A50",
    accent: "#70C080",
    region: "Paraguay",
    era: "1500 CE",
    ayush: "Naturopathy",
    tags: ["Anti-diabetic", "Sweetener", "Metabolic"],
    summary:
      "Nature's zero-calorie sweetener — the Guarani people of Paraguay have used stevia for 500+ years.",
    history:
      "Guarani people called it ka'a he'ê, the sweet herb, and sweetened bitter medicines with it.",
    traditional:
      "Leaves chewed as sweet treat; used to sweeten teas and medicines without sugar.",
    modern:
      "Steviosides are 200-300× sweeter than sugar with zero glycemic impact in clinical trials.",
    future:
      "Rebaudioside M being developed for diabetic-safe confections and pharmaceutical formulations.",
  },
  {
    id: 21,
    name: "Guduchi",
    latin: "Tinospora cordifolia",
    emoji: "🌿",
    color: "#4A6A3A",
    accent: "#7AA85A",
    region: "India",
    era: "1500 BCE",
    ayush: "Ayurveda",
    tags: ["Immunity", "Anti-diabetic", "Adaptogen"],
    summary:
      "Amrita — divine nectar of immortality in Ayurveda, boosting immunity and fighting chronic disease.",
    history:
      "Charaka Samhita lists guduchi as one of the most valuable medicinal plants in Ayurveda.",
    traditional:
      "Stem decocted for fever, jaundice, and rheumatoid arthritis management.",
    modern:
      "Tinosporin modulates macrophage activity; clinical evidence for Type 2 diabetes management.",
    future:
      "Immunomodulatory compounds being investigated for post-viral syndrome and long COVID.",
  },
  {
    id: 22,
    name: "Triphala",
    latin: "Three-fruit formula",
    emoji: "🍈",
    color: "#8A6040",
    accent: "#C09060",
    region: "India",
    era: "1000 BCE",
    ayush: "Ayurveda",
    tags: ["Digestive", "Antioxidant", "Detox"],
    summary:
      "The three-fruit formula — Ayurveda's most revered daily tonic for digestive and systemic health.",
    history:
      "Ancient Ayurvedic texts document triphala as the foundational formula for daily wellness.",
    traditional:
      "Churna (powder) taken with warm water nightly for bowel regularity and detoxification.",
    modern:
      "All three components show prebiotic activity, supporting gut microbiome diversity.",
    future:
      "Triphala polyphenols being studied for colorectal cancer prevention in Phase I trials.",
  },
  {
    id: 23,
    name: "Andrographis",
    latin: "Andrographis paniculata",
    emoji: "🌱",
    color: "#3D6A3D",
    accent: "#6A9A5A",
    region: "South & SE Asia",
    era: "600 CE",
    ayush: "Ayurveda",
    tags: ["Antiviral", "Immunity", "Anti-inflammatory"],
    summary:
      "King of bitters — the most researched Ayurvedic plant for infectious disease management.",
    history:
      "Used in traditional medicine across India, Sri Lanka, Malaysia, and China for centuries.",
    traditional:
      "Bitter leaf decoction for fever, liver disease, and respiratory tract infections.",
    modern:
      "Andrographolide reduces cold duration by 2-3 days in clinical trials; antiviral against influenza.",
    future:
      "Andrographolide derivatives being tested as antivirals against SARS-CoV-2 variants.",
  },
  {
    id: 24,
    name: "Boswellia",
    latin: "Boswellia serrata",
    emoji: "🟤",
    color: "#9A6030",
    accent: "#D4A060",
    region: "India & Arabia",
    era: "1500 BCE",
    ayush: "Ayurveda",
    tags: ["Anti-inflammatory", "Joint Health", "Pain Relief"],
    summary:
      "Sacred frankincense — the resin that healed warriors and priests for 3,500 years.",
    history:
      "Used in Ayurveda as shallaki; burned as sacred incense in ancient Egypt and Rome.",
    traditional:
      "Resin applied to swollen joints; burned for respiratory congestion; worn as amulet.",
    modern:
      "AKBA (boswellic acid) selectively inhibits 5-LOX, reducing inflammation without GI side effects.",
    future:
      "Boswellic acid formulations in trials for Crohn's disease and osteoarthritis as steroid alternatives.",
  },
  {
    id: 25,
    name: "Punarnava",
    latin: "Boerhavia diffusa",
    emoji: "🌺",
    color: "#C84060",
    accent: "#F07090",
    region: "India & Africa",
    era: "500 CE",
    ayush: "Ayurveda",
    tags: ["Kidney Health", "Diuretic", "Anti-inflammatory"],
    summary:
      "The plant that renews — punarnava literally means that which makes new again, revitalizing kidneys and liver.",
    history:
      "Classical Ayurvedic texts describe it as a rasayana that renews body tissues.",
    traditional:
      "Root decoction used for edema, kidney stones, and liver conditions.",
    modern:
      "Punarnavine shows diuretic activity and hepatoprotective effects in animal models.",
    future:
      "Kidney stone prevention formulations using punarnavine under clinical development.",
  },
  {
    id: 26,
    name: "Haritaki",
    latin: "Terminalia chebula",
    emoji: "🫒",
    color: "#7A6A30",
    accent: "#B0A050",
    region: "India & SE Asia",
    era: "1000 BCE",
    ayush: "Ayurveda",
    tags: ["Digestive", "Antioxidant", "Anti-aging"],
    summary:
      "The king of medicines in Tibetan medicine — haritaki benefits every organ system.",
    history:
      "Called haritaki in Sanskrit — that which carries away disease. Used in Triphala formulation.",
    traditional:
      "Fruit powder for digestive disorders, eye washes, and as a general rejuvenative tonic.",
    modern:
      "Chebulinic acid shows potent antioxidant activity; antibacterial against drug-resistant strains.",
    future:
      "Tannin fraction being researched for anti-HIV activity and tumor suppression.",
  },
  {
    id: 27,
    name: "Bibhitaki",
    latin: "Terminalia bellirica",
    emoji: "🫙",
    color: "#6A7040",
    accent: "#A0A860",
    region: "India & SE Asia",
    era: "1000 BCE",
    ayush: "Ayurveda",
    tags: ["Respiratory", "Digestive", "Antioxidant"],
    summary:
      "The second fruit of Triphala — bibhitaki cleanses and strengthens respiratory passages.",
    history:
      "Used in Ayurvedic texts as the remover of disease; part of the sacred Triphala trio.",
    traditional:
      "Fruit decoction for cough, bronchitis, and voice disorders; seed oil for hair care.",
    modern:
      "Gallic acid in bibhitaki inhibits platelet aggregation and shows hepatoprotective activity.",
    future:
      "Ellagic acid derivatives being researched for anti-proliferative activity in cancer cell lines.",
  },
  {
    id: 28,
    name: "Guggulu",
    latin: "Commiphora mukul",
    emoji: "🟡",
    color: "#C09020",
    accent: "#E0C050",
    region: "India & Arabia",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Cholesterol", "Anti-inflammatory", "Thyroid"],
    summary:
      "Ancient Ayurvedic resin for cardiovascular health — validated in modern lipid management trials.",
    history:
      "Sushruta Samhita (600 BCE) prescribes guggulu for obesity, arthritis, and heart disease.",
    traditional:
      "Resin tablets taken for joint pain, high cholesterol, and hypothyroid support.",
    modern:
      "Guggulsterones modulate bile acid receptor, lowering LDL by 12-15% in clinical trials.",
    future:
      "Guggulsterone Z derivative development for non-alcoholic fatty liver disease (NAFLD).",
  },
  {
    id: 29,
    name: "Shilajit",
    latin: "Asphaltum punjabianum",
    emoji: "🪨",
    color: "#5A4020",
    accent: "#906040",
    region: "Himalayas",
    era: "3000 BCE",
    ayush: "Ayurveda",
    tags: ["Energy", "Adaptogen", "Mineral"],
    summary:
      "Mountain tar — a mineral-rich exudate from Himalayan rocks with unique rejuvenating properties.",
    history:
      "Charaka Samhita describes shilajit as the conqueror of mountains and destroyer of weakness.",
    traditional:
      "Dissolved in milk for strength, vitality, and altitude sickness in Himalayan communities.",
    modern:
      "Fulvic acid enhances mitochondrial function; clinical trials show testosterone improvement.",
    future:
      "Dibenzo-alpha-pyrones being studied for mitochondrial disease and chronic fatigue syndrome.",
  },
  {
    id: 30,
    name: "Arjuna",
    latin: "Terminalia arjuna",
    emoji: "🌳",
    color: "#5A7A3A",
    accent: "#8AB05A",
    region: "India",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Heart Health", "Cardioprotective", "Anti-hypertensive"],
    summary:
      "The warrior's tree — Arjuna bark strengthening the heart for 2,600 years.",
    history:
      "Named after the archer-hero of Mahabharata; Vagbhata prescribed it for heart conditions.",
    traditional:
      "Bark decoction taken daily for heart failure, angina, and hypertension management.",
    modern:
      "Arjunolic acid reduces systolic BP by 5-10 mmHg and improves cardiac ejection fraction.",
    future:
      "Glycoside formulations being developed as adjuvant therapy in ischemic heart disease.",
  },
  {
    id: 31,
    name: "Tulsi Vana",
    latin: "Ocimum gratissimum",
    emoji: "🌱",
    color: "#5A8A50",
    accent: "#88C278",
    region: "Africa & India",
    era: "1000 CE",
    ayush: "Ayurveda",
    tags: ["Antimicrobial", "Respiratory", "Adaptogen"],
    summary:
      "Wild forest tulsi with stronger antimicrobial properties than common holy basil.",
    history:
      "Used across African traditional medicine and Indian Ayurveda for respiratory conditions.",
    traditional:
      "Leaf steam inhalation for respiratory infections; crushed leaves applied to skin infections.",
    modern:
      "Eugenol-rich essential oil shows broad-spectrum antimicrobial activity in laboratory studies.",
    future:
      "Eugenol derivatives being tested as natural preservatives replacing synthetic food additives.",
  },
  {
    id: 32,
    name: "Vijaysar",
    latin: "Pterocarpus marsupium",
    emoji: "🪵",
    color: "#8A5A30",
    accent: "#C08A50",
    region: "India",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Anti-diabetic", "Liver Health", "Antioxidant"],
    summary:
      "The miracle wood — water stored in vijaysar cups shows measurable anti-diabetic activity.",
    history:
      "Ancient Ayurvedic texts list it as a prime herb for diabetes (prameha) management.",
    traditional:
      "Bark decoction and water stored overnight in wooden cups for diabetes management.",
    modern:
      "Epicatechin and marsupin regenerate beta cells and improve insulin sensitivity.",
    future:
      "Beta-cell regeneration pathway being explored as potential Type 1 diabetes intervention.",
  },
  {
    id: 33,
    name: "Kutki",
    latin: "Picrorhiza kurroa",
    emoji: "🌿",
    color: "#4A6A30",
    accent: "#80A050",
    region: "Himalayas",
    era: "800 CE",
    ayush: "Ayurveda",
    tags: ["Liver Health", "Immunity", "Anti-inflammatory"],
    summary:
      "Himalayan bitter root — the most potent liver tonic in Ayurvedic materia medica.",
    history:
      "Ashtanga Hridayam prescribes kutki as primary liver herb for jaundice and hepatitis.",
    traditional:
      "Root powder for liver disorders, immune weakness, and chronic inflammatory conditions.",
    modern:
      "Picroliv improves liver enzyme profiles comparable to silymarin in hepatitis B trials.",
    future:
      "Picroside II being developed for autoimmune hepatitis as an immunomodulatory agent.",
  },
  {
    id: 34,
    name: "Shankhpushpi",
    latin: "Convolvulus pluricaulis",
    emoji: "🌸",
    color: "#7A80C8",
    accent: "#A8B0F0",
    region: "India",
    era: "600 CE",
    ayush: "Ayurveda",
    tags: ["Cognitive", "Neuroprotective", "Calming"],
    summary:
      "The conch-flower herb — Ayurveda's foremost herb for intelligence and memory enhancement.",
    history:
      "Charaka lists shankhpushpi among the five primary intellect-promoting herbs (medhya rasayanas).",
    traditional:
      "Syrup given to children for memory; adults for anxiety, insomnia, and epilepsy management.",
    modern:
      "Scopoletin inhibits acetylcholinesterase, supporting use for memory enhancement.",
    future:
      "Scopoline derivatives being screened as cognitive enhancers for vascular dementia.",
  },
  {
    id: 35,
    name: "Jatamansi",
    latin: "Nardostachys jatamansi",
    emoji: "🌾",
    color: "#8A7050",
    accent: "#C0A870",
    region: "Himalayas",
    era: "500 BCE",
    ayush: "Ayurveda",
    tags: ["Calming", "Neuroprotective", "Sleep"],
    summary:
      "Himalayan spikenard — the ancient perfume of kings and Ayurvedic sedative for the nervous system.",
    history:
      "Used by ancient Egyptians for perfume and embalming; Mary anointed Jesus with spikenard oil.",
    traditional:
      "Root oil applied to scalp for insomnia; decoction for epilepsy and hysteria.",
    modern:
      "Jatamansone shows anxiolytic activity comparable to diazepam without sedation in animal models.",
    future:
      "Jatamansone derivatives under investigation for treatment-resistant depression.",
  },
  {
    id: 36,
    name: "Kapikachhu",
    latin: "Mucuna pruriens",
    emoji: "🫘",
    color: "#6A5A3A",
    accent: "#A09060",
    region: "India & Tropics",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Neurological", "Men's Health", "Anti-Parkinson's"],
    summary:
      "Velvet bean — naturally containing L-DOPA, the precursor to dopamine, for Parkinson's management.",
    history:
      "Charaka Samhita prescribes it for shukra (male reproductive) vitality and neurological disorders.",
    traditional:
      "Seed powder in milk for sexual health, tremors, and nervous system weakness.",
    modern:
      "High L-DOPA content (4-6%) makes it effective for Parkinson's motor symptoms.",
    future:
      "Mucuna-derived L-DOPA being developed as a side-effect-reduced alternative to synthetic levodopa.",
  },
  {
    id: 37,
    name: "Sarpagandha",
    latin: "Rauvolfia serpentina",
    emoji: "🌿",
    color: "#4A5A4A",
    accent: "#7A8A7A",
    region: "India & SE Asia",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Anti-hypertensive", "Calming", "Antipsychotic"],
    summary:
      "Snake root — the first plant-derived treatment for hypertension, inspiring modern blood pressure drugs.",
    history:
      "Ayurveda used it for insanity and snakebite; WHO documented its anti-hypertensive use.",
    traditional:
      "Root powder for high blood pressure, insomnia, and anxiety in traditional medicine.",
    modern:
      "Reserpine (derived from it) was the first antihypertensive drug — revolutionizing cardiology.",
    future:
      "Novel rauwolfia alkaloids being screened for multidrug-resistant psychiatric conditions.",
  },
  {
    id: 38,
    name: "Gudmar",
    latin: "Gymnema sylvestre",
    emoji: "🌿",
    color: "#4A7050",
    accent: "#80B070",
    region: "India & Africa",
    era: "600 CE",
    ayush: "Ayurveda",
    tags: ["Anti-diabetic", "Sugar Blocker", "Metabolic"],
    summary:
      "The sugar destroyer — gymnema temporarily blocks sweet taste receptors and reduces glucose absorption.",
    history:
      "Used in traditional Indian medicine for 2,000 years specifically for madhumeha (diabetes).",
    traditional:
      "Leaf chewed to destroy sweet taste; decoction taken daily for blood sugar management.",
    modern:
      "Gymnemic acids reduce glucose absorption by 50%; regenerate beta cells in animal studies.",
    future:
      "Gymnema-derived sweetness blockers being developed for obesity and sugar addiction treatment.",
  },
  {
    id: 39,
    name: "Pippali",
    latin: "Piper longum",
    emoji: "🫙",
    color: "#6A4030",
    accent: "#A07050",
    region: "India & SE Asia",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Respiratory", "Digestive", "Bioenhancer"],
    summary:
      "Long pepper — Ayurveda's bioenhancer that increases the potency of all other herbs when combined.",
    history:
      "More valuable than black pepper in ancient Rome; mentioned in Hippocratic texts.",
    traditional:
      "Ground with honey for respiratory conditions; combined with other herbs as bioenhancer.",
    modern:
      "Piperine increases bioavailability of curcumin by 2000% and many pharmaceuticals significantly.",
    future:
      "Piperine-drug combination patents being filed for enhanced chemotherapy drug delivery.",
  },
  {
    id: 40,
    name: "Bhumyamalaki",
    latin: "Phyllanthus niruri",
    emoji: "🌱",
    color: "#4A7840",
    accent: "#7AB870",
    region: "India & Americas",
    era: "600 CE",
    ayush: "Ayurveda",
    tags: ["Liver Health", "Antiviral", "Kidney Health"],
    summary:
      "Stone breaker — used to dissolve kidney stones and fight hepatitis B across three continents.",
    history:
      "Used identically in Ayurveda, Amazonian, and African traditional medicine for liver conditions.",
    traditional:
      "Whole plant decoction for hepatitis, kidney stones, and urinary tract infections.",
    modern:
      "Phyllanthin shows hepatoprotective activity; clinical trials show kidney stone prevention.",
    future:
      "Niranthin under investigation as antiretroviral agent against HIV replication.",
  },
  {
    id: 41,
    name: "Manjishtha",
    latin: "Rubia cordifolia",
    emoji: "🔴",
    color: "#A03040",
    accent: "#E06070",
    region: "India & Himalayas",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Blood Purifier", "Skin Care", "Anti-inflammatory"],
    summary:
      "Indian madder — the supreme blood purifier and skin health herb in Ayurvedic tradition.",
    history:
      "Used as a red dye across ancient India; Charaka prescribes it for skin diseases and blood disorders.",
    traditional:
      "Root powder for skin conditions, menstrual disorders, and urinary tract infections.",
    modern:
      "Mollugin shows anti-inflammatory and hepatoprotective activity in preclinical studies.",
    future:
      "Manjistha-derived compounds being investigated for anti-tumor and immunomodulatory properties.",
  },
  {
    id: 42,
    name: "Vacha",
    latin: "Acorus calamus",
    emoji: "🌿",
    color: "#5A7A4A",
    accent: "#8AB070",
    region: "India & China",
    era: "2000 BCE",
    ayush: "Ayurveda",
    tags: ["Cognitive", "Digestive", "Neurological"],
    summary:
      "Sweet flag — the ancient herb of memory and speech, sacred in both Ayurvedic and Shamanic traditions.",
    history:
      "Used in ancient Egypt, India, and China for at least 4,000 years for consciousness and healing.",
    traditional:
      "Root chewed for clarity, speech disorders, and epilepsy; decoction for digestive conditions.",
    modern:
      "Alpha-asarone shows anticonvulsant activity; beta-asarone controversial for mutagenicity.",
    future:
      "Non-asarone vacha fractions being isolated for safe cognitive enhancement applications.",
  },
  {
    id: 43,
    name: "Lodhra",
    latin: "Symplocos racemosa",
    emoji: "🌸",
    color: "#A06080",
    accent: "#D090A8",
    region: "India",
    era: "600 CE",
    ayush: "Ayurveda",
    tags: ["Women's Health", "Astringent", "Skin Care"],
    summary:
      "The binding tree — Ayurveda's foremost herb for women's reproductive health and uterine tone.",
    history:
      "Charaka Samhita lists lodhra as primary herb for female reproductive system support.",
    traditional:
      "Bark powder for excessive menstrual bleeding and uterine prolapse management.",
    modern:
      "Loturine and colloturine show uterine contractile activity in pharmacological studies.",
    future:
      "Uterine tonic formulations using standardized lodhra extract in development for postpartum care.",
  },
  {
    id: 44,
    name: "Kanchanar",
    latin: "Bauhinia variegata",
    emoji: "🌺",
    color: "#C06090",
    accent: "#E890B8",
    region: "India",
    era: "600 CE",
    ayush: "Ayurveda",
    tags: ["Thyroid", "Anti-tumor", "Lymph"],
    summary:
      "The orchid tree — Ayurveda's primary herb for thyroid disorders and lymphatic system health.",
    history:
      "Ashtanga Hridayam prescribes kanchanar guggulu as primary formula for thyroid and lymph.",
    traditional:
      "Bark decoction for thyroid nodules, lymphadenopathy, and skin conditions.",
    modern:
      "Flavonoids in kanchanar show anti-proliferative activity against thyroid cancer cell lines.",
    future:
      "Kanchanar guggulu being tested in RCT for hypothyroidism as complementary therapy.",
  },
  {
    id: 45,
    name: "Devdaru",
    latin: "Cedrus deodara",
    emoji: "🌲",
    color: "#5A7050",
    accent: "#8AA870",
    region: "Himalayas",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Anti-inflammatory", "Respiratory", "Neurological"],
    summary:
      "The divine tree — Himalayan cedar with profound anti-inflammatory and neurological benefits.",
    history:
      "Sanskrit name means tree of the gods; worshipped across Himalayan cultures for millennia.",
    traditional:
      "Bark decoction for rheumatoid arthritis, fever, and respiratory conditions.",
    modern:
      "Deodarin shows anti-inflammatory activity comparable to indomethacin in animal models.",
    future:
      "Himalayan cedar essential oil being investigated for its anticonvulsant properties.",
  },
  {
    id: 46,
    name: "Yashtimadhu",
    latin: "Glycyrrhiza glabra",
    emoji: "🌿",
    color: "#8A7A40",
    accent: "#C0B060",
    region: "Mediterranean & India",
    era: "3000 BCE",
    ayush: "Ayurveda",
    tags: ["Respiratory", "Anti-ulcer", "Adrenal"],
    summary:
      "Sweet root of the world — licorice root used across ancient Egypt, China, and India for millennia.",
    history:
      "Found in King Tutankhamun's tomb. One of the oldest documented medicinal plants globally.",
    traditional:
      "Root decoction for cough, gastric ulcers, and adrenal exhaustion.",
    modern:
      "Glycyrrhizin inhibits H. pylori; DGL formulations approved for peptic ulcer management.",
    future:
      "Liquiritin being investigated for antidepressant activity via monoamine regulation.",
  },
  {
    id: 47,
    name: "Vidari Kanda",
    latin: "Pueraria tuberosa",
    emoji: "🌱",
    color: "#5A8A50",
    accent: "#90B878",
    region: "India",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Men's Health", "Adaptogen", "Nutrition"],
    summary:
      "The wild potato of Ayurveda — a powerful rejuvenating tuber for male vitality and stamina.",
    history:
      "Charaka Samhita lists it among the most important rejuvenating plants (jivaniya group).",
    traditional:
      "Tuber powder in milk for sexual weakness, weight gain, and post-illness recovery.",
    modern:
      "Puerarin (isoflavone) shows estrogenic activity and cardiovascular protective effects.",
    future:
      "Vidari isoflavones being studied for menopause symptom relief and bone density preservation.",
  },
  {
    id: 48,
    name: "Nagarmotha",
    latin: "Cyperus rotundus",
    emoji: "🌾",
    color: "#8A7050",
    accent: "#C0A870",
    region: "India & Tropics",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Digestive", "Anti-bacterial", "Fever"],
    summary:
      "Nut grass — one of the world's most invasive weeds is also one of Ayurveda's finest digestive herbs.",
    history:
      "Ebers Papyrus documents it for intestinal conditions in ancient Egypt 3,500 years ago.",
    traditional:
      "Rhizome decoction for digestive disorders, fever, menstrual pain, and diarrhea.",
    modern:
      "Alpha-cyperone shows anti-bacterial activity against drug-resistant strains in vitro.",
    future:
      "Cyperene compounds being investigated for antiproliferative activity in colon cancer.",
  },
  {
    id: 49,
    name: "Bael",
    latin: "Aegle marmelos",
    emoji: "🍈",
    color: "#A08030",
    accent: "#D0B050",
    region: "India",
    era: "2000 BCE",
    ayush: "Ayurveda",
    tags: ["Digestive", "Anti-diabetic", "Sacred"],
    summary:
      "The bel fruit — sacred to Shiva and scientifically validated for digestive and anti-diabetic activity.",
    history:
      "Atharva Veda and Rigveda mention bael as sacred. The tree represents the three aspects of Shiva.",
    traditional:
      "Unripe fruit for diarrhea; ripe fruit as summer cooler and nutritive; leaves in religious rites.",
    modern:
      "Marmelosin shows anti-diabetic activity; fruit extract shows antibacterial and antifungal properties.",
    future:
      "Bael polysaccharides being developed as prebiotic supplements for gut microbiome modulation.",
  },
  {
    id: 50,
    name: "Gokshura",
    latin: "Tribulus terrestris",
    emoji: "🌱",
    color: "#8A8A30",
    accent: "#C0C050",
    region: "India & Mediterranean",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Men's Health", "Kidney Health", "Athletic"],
    summary:
      "Puncture vine — nature's testosterone booster used in Ayurveda and ancient Greek medicine.",
    history:
      "Ancient Ayurvedic texts list it as primary herb for male reproductive and urinary health.",
    traditional:
      "Fruit powder for kidney stones, urinary disorders, and male sexual vitality.",
    modern:
      "Protodioscin increases testosterone by 16-22% in clinical trials; diuretic activity confirmed.",
    future:
      "Steroidal saponins being investigated for non-hormonal testosterone support mechanisms.",
  },
  {
    id: 51,
    name: "Dang Gui",
    latin: "Angelica sinensis",
    emoji: "🌸",
    color: "#C06880",
    accent: "#E8A0B0",
    region: "China",
    era: "200 BCE",
    ayush: "TCM",
    tags: ["Women's Health", "Blood Tonic", "Circulatory"],
    summary:
      "Female ginseng — the most used herb in Traditional Chinese Medicine for women's health for 2,000 years.",
    history:
      "First documented in Shennong Bencao Jing (200 BCE) as supreme blood tonic.",
    traditional:
      "Root decoction for menstrual irregularity, anemia, and post-partum recovery.",
    modern:
      "Ferulic acid and polysaccharides improve blood circulation and show mild phytoestrogenic activity.",
    future:
      "Ligustilide derivatives being investigated for neuroprotection and migraine prophylaxis.",
  },
  {
    id: 52,
    name: "Huang Qi",
    latin: "Astragalus membranaceus",
    emoji: "🌿",
    color: "#8A9040",
    accent: "#C0C860",
    region: "China & Mongolia",
    era: "100 CE",
    ayush: "TCM",
    tags: ["Immunity", "Adaptogen", "Anti-aging"],
    summary:
      "Milk vetch — China's supreme qi tonic and immunity enhancer, now validated for anti-aging.",
    history:
      "First recorded in Shennong Bencao Jing as a superior tonic for vital energy (qi).",
    traditional:
      "Root decocted or simmered in soups for immune weakness, fatigue, and spontaneous sweating.",
    modern:
      "Cycloastragenol activates telomerase, extending telomere length in cell studies.",
    future:
      "TA-65 (astragalus-derived) supplement for aging in advanced clinical development.",
  },
  {
    id: 53,
    name: "Ginseng",
    latin: "Panax ginseng",
    emoji: "🌿",
    color: "#8A5A30",
    accent: "#C08A50",
    region: "Korea & China",
    era: "5000 BCE",
    ayush: "TCM",
    tags: ["Adaptogen", "Energy", "Cognitive"],
    summary:
      "The root of heaven — the world's most celebrated adaptogen and tonic for 5,000 years.",
    history:
      "Mentioned in the oldest Chinese pharmacopeia; more valuable than gold at its peak trade.",
    traditional:
      "Root simmered for 4 hours and consumed as tonic for emperors and scholars.",
    modern:
      "Ginsenosides modulate HPA axis; 14 RCTs confirm cognitive and energy benefits.",
    future:
      "Compound K (ginsenoside metabolite) in Phase II trials for cancer and neurodegenerative disease.",
  },
  {
    id: 54,
    name: "He Shou Wu",
    latin: "Polygonum multiflorum",
    emoji: "🌱",
    color: "#6A4830",
    accent: "#A07850",
    region: "China",
    era: "700 CE",
    ayush: "TCM",
    tags: ["Anti-aging", "Hair Health", "Blood Tonic"],
    summary:
      "Black hair root — Chinese herb of longevity credited with restoring dark hair and sexual vitality.",
    history:
      "Tang dynasty legend describes Mr. He restoring his youth with this root; hence the name.",
    traditional:
      "Root prepared with black beans for hair loss, premature aging, and essence deficiency.",
    modern:
      "Stilbene glycosides show neuroprotective activity; caution needed for hepatotoxicity risk.",
    future:
      "Safer stilbene fractions being isolated from whole root for anti-aging nutraceuticals.",
  },
  {
    id: 55,
    name: "Dan Shen",
    latin: "Salvia miltiorrhiza",
    emoji: "❤️",
    color: "#C03040",
    accent: "#E87080",
    region: "China",
    era: "500 BCE",
    ayush: "TCM",
    tags: ["Heart Health", "Circulatory", "Anti-inflammatory"],
    summary:
      "Red sage — TCM's premier cardiac herb, protecting the heart and improving blood circulation.",
    history:
      "First Shennong Bencao Jing herb for blood stasis; used continuously for 2,500 years.",
    traditional:
      "Root decoction for angina, palpitations, insomnia, and menstrual pain.",
    modern:
      "Tanshinone IIA reduces myocardial damage; approved as cardiac drug in China.",
    future:
      "Water-soluble tanshinone derivatives in Phase III trials for acute myocardial infarction.",
  },
  {
    id: 56,
    name: "Wu Wei Zi",
    latin: "Schisandra chinensis",
    emoji: "🫐",
    color: "#8A3060",
    accent: "#C07090",
    region: "China & Russia",
    era: "100 CE",
    ayush: "TCM",
    tags: ["Adaptogen", "Liver Health", "Cognitive"],
    summary:
      "Five-flavor berry — the only plant carrying all five elemental tastes, an adaptogen for every system.",
    history:
      "Listed in Shennong Bencao Jing as superior class tonic for all deficiencies.",
    traditional:
      "Berries chewed by hunters and monks for endurance, concentration, and liver protection.",
    modern:
      "Schisandrin B improves liver enzyme profiles in chronic hepatitis; cognitive benefits confirmed.",
    future:
      "Schisandrol derivatives being tested as hepatoprotective agents for drug-induced liver injury.",
  },
  {
    id: 57,
    name: "Huang Lian",
    latin: "Coptis chinensis",
    emoji: "🌿",
    color: "#8A7020",
    accent: "#C0A840",
    region: "China",
    era: "200 BCE",
    ayush: "TCM",
    tags: ["Anti-diabetic", "Anti-bacterial", "Digestive"],
    summary:
      "Golden thread — berberine-rich root validated as effective as metformin for Type 2 diabetes.",
    history:
      "Shennong Bencao Jing documents it as bitter, cold herb for damp-heat conditions.",
    traditional:
      "Root decoction for intestinal infections, diabetes, and hypertension management.",
    modern:
      "Berberine reduces HbA1c by 2.0% — comparable to metformin in head-to-head trials.",
    future:
      "Berberine in Phase III trials for PCOS, dyslipidemia, and metabolic syndrome.",
  },
  {
    id: 58,
    name: "Luo Han Guo",
    latin: "Siraitia grosvenorii",
    emoji: "🟢",
    color: "#5A8A40",
    accent: "#90C870",
    region: "South China",
    era: "1300 CE",
    ayush: "TCM",
    tags: ["Sweetener", "Anti-diabetic", "Respiratory"],
    summary:
      "Monk fruit — the Buddhist monks' zero-calorie sweetener, 250 times sweeter than sugar.",
    history:
      "Cultivated by monks in Guangxi for centuries; named Monk Fruit in western markets.",
    traditional:
      "Dried fruit steeped for sore throat, cough, and as a refreshing sweet beverage.",
    modern:
      "Mogrosides are non-caloric, non-glycemic; FDA approved as generally safe sweetener.",
    future:
      "Mogroside V in clinical trials for anti-tumor and anti-inflammatory applications.",
  },
  {
    id: 59,
    name: "Bai Zhu",
    latin: "Atractylodes macrocephala",
    emoji: "🌼",
    color: "#C8A030",
    accent: "#F0C850",
    region: "China",
    era: "200 BCE",
    ayush: "TCM",
    tags: ["Digestive", "Immunity", "Qi Tonic"],
    summary:
      "White atractylodes — TCM's primary herb for strengthening the spleen and digestive vital energy.",
    history:
      "Essential herb in Si Jun Zi Tang (Four Gentlemen), TCM's foundational digestive formula.",
    traditional:
      "Rhizome decoction for poor appetite, chronic diarrhea, edema, and fatigue.",
    modern:
      "Polysaccharides from Bai Zhu show immunostimulatory and antitumor activity in studies.",
    future:
      "Atractylone being investigated as a mucoprotective agent for inflammatory bowel disease.",
  },
  {
    id: 60,
    name: "Yi Yi Ren",
    latin: "Coix lacryma-jobi",
    emoji: "🫙",
    color: "#A09040",
    accent: "#D0C060",
    region: "China & SE Asia",
    era: "200 BCE",
    ayush: "TCM",
    tags: ["Anti-tumor", "Digestive", "Skin Care"],
    summary:
      "Job's tears — a remarkable grain used in TCM for cancer prevention, digestion, and skin clarity.",
    history:
      "Shennong Bencao Jing documents it for removing damp-heat and promoting tissue recovery.",
    traditional:
      "Seeds cooked in congee for digestive weakness, rheumatism, and skin conditions.",
    modern:
      "Coixenolide shows antitumor activity; approved as adjuvant cancer therapy in China.",
    future:
      "Coix seed polysaccharide nanoparticles being developed for targeted cancer drug delivery.",
  },
  {
    id: 61,
    name: "Mulethi",
    latin: "Glycyrrhiza uralensis",
    emoji: "🌿",
    color: "#7A7030",
    accent: "#B0A848",
    region: "Central Asia",
    era: "2000 BCE",
    ayush: "Unani",
    tags: ["Respiratory", "Anti-ulcer", "Anti-viral"],
    summary:
      "Sweet wood — the Unani physician's essential herb for cough, gastric conditions, and viral illness.",
    history:
      "Used by Ibn Sina (Avicenna) in his Canon of Medicine for lung and liver conditions.",
    traditional:
      "Root chewed for cough; decoction for stomach ulcers and urinary tract infections.",
    modern:
      "Glycyrrhizin shows anti-SARS-CoV activity; Phase II trials for COVID-19 adjuvant therapy.",
    future:
      "Modified glycyrrhizin without mineralocorticoid side effects under pharmaceutical development.",
  },
  {
    id: 62,
    name: "Kesar",
    latin: "Crocus sativus",
    emoji: "🟣",
    color: "#9A4080",
    accent: "#D070B0",
    region: "Iran & Kashmir",
    era: "3000 BCE",
    ayush: "Unani",
    tags: ["Mood", "Anti-depressant", "Women's Health"],
    summary:
      "Red gold — the world's most expensive spice with clinically validated anti-depressant effects.",
    history:
      "Cultivated in Persia for 3,000 years; Cleopatra used saffron in baths and cosmetics.",
    traditional:
      "Used in Unani medicine for depression, sexual dysfunction, and menstrual disorders.",
    modern:
      "Crocin and safranal show antidepressant effects comparable to fluoxetine in RCTs.",
    future:
      "Saffron supplement for mild-moderate depression entering mainstream psychiatric protocols.",
  },
  {
    id: 63,
    name: "Rewand Chini",
    latin: "Rheum emodi",
    emoji: "🌿",
    color: "#C04040",
    accent: "#E07070",
    region: "Himalayas",
    era: "600 CE",
    ayush: "Unani",
    tags: ["Digestive", "Liver Health", "Laxative"],
    summary:
      "Himalayan rhubarb — Unani medicine's most important digestive cleansing and liver herb.",
    history:
      "Ibn Sina prescribed it for liver obstruction and bowel cleansing in the Canon of Medicine.",
    traditional:
      "Root powder for constipation, liver conditions, and cleansing the digestive tract.",
    modern:
      "Emodin and aloe-emodin show hepatoprotective and anti-cancer activity in cell studies.",
    future:
      "Emodin derivatives being investigated for anti-proliferative activity in liver cancer.",
  },
  {
    id: 64,
    name: "Kababchini",
    latin: "Piper cubeba",
    emoji: "🫙",
    color: "#7A5030",
    accent: "#B08050",
    region: "SE Asia",
    era: "1000 CE",
    ayush: "Unani",
    tags: ["Respiratory", "Urinary", "Antimicrobial"],
    summary:
      "Tailed pepper — Unani medicine's foremost herb for respiratory and urinary tract infections.",
    history:
      "Arab traders brought it to Europe in medieval times; prescribed by Ibn Sina for lung conditions.",
    traditional:
      "Fruits chewed for cough, gonorrhea, and digestive conditions in Unani medicine.",
    modern:
      "Cubebin shows antimicrobial activity against drug-resistant E. coli and Staphylococcus.",
    future:
      "Cubebene derivatives being investigated for antileishmanial activity in tropical medicine.",
  },
  {
    id: 65,
    name: "Brahmi TCM",
    latin: "Ji Xue Cao",
    emoji: "💚",
    color: "#3A7A60",
    accent: "#68B890",
    region: "India & SE Asia",
    era: "1000 CE",
    ayush: "TCM",
    tags: ["Cognitive", "Wound Healing", "Circulation"],
    summary:
      "Gotu Kola as understood by Chinese medicine — clearing heat, detoxifying, and promoting tissue healing.",
    history:
      "Included in Chinese pharmacopeia for its wound-healing and detoxifying properties.",
    traditional:
      "Fresh herb applied to wounds; decoction for high fever, jaundice, and swelling.",
    modern:
      "Centellasaponins reduce scar formation; clinical applications in vascular and cognitive health.",
    future:
      "Asiaticside topical formulations being developed for keloid scar prevention.",
  },
  {
    id: 66,
    name: "Kalmegh",
    latin: "Andrographis paniculata",
    emoji: "🌿",
    color: "#3A6A3A",
    accent: "#6A9A5A",
    region: "India & SE Asia",
    era: "600 CE",
    ayush: "Ayurveda",
    tags: ["Antiviral", "Liver Health", "Immunity"],
    summary:
      "Green chiretta — the Ayurvedic king of bitters with the broadest antiviral spectrum of any herb.",
    history:
      "Used across Indian, Thai, Malaysian, and Chinese traditional medicine for millennia.",
    traditional:
      "Bitter leaf juice for liver protection, fevers, and as a post-illness recovery tonic.",
    modern:
      "Andrographolide inhibits NF-kB pathway, reducing inflammatory cytokine storms.",
    future:
      "Andrographolide analogs entering clinical trials for acute respiratory distress syndrome.",
  },
  {
    id: 67,
    name: "Chirayata",
    latin: "Swertia chirayita",
    emoji: "🌿",
    color: "#5A7A40",
    accent: "#90B870",
    region: "Himalayas",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Fever", "Liver Health", "Anti-malarial"],
    summary:
      "Himalayan gentian — one of the bitterest plants on earth and a potent anti-malarial agent.",
    history:
      "Charaka lists it among the best bitter herbs for fever; exported globally by 19th century.",
    traditional:
      "Whole plant decoction for malaria, intermittent fever, and liver and spleen disorders.",
    modern:
      "Swertiamarin shows antidiabetic, hepatoprotective, and antimalarial activity in studies.",
    future:
      "Chirayata alkaloids being screened as antimalarial agents against chloroquine-resistant strains.",
  },
  {
    id: 68,
    name: "Bakuchi",
    latin: "Psoralea corylifolia",
    emoji: "🌑",
    color: "#3A3A5A",
    accent: "#6A6A8A",
    region: "India",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Skin Care", "Vitiligo", "Bone Health"],
    summary:
      "The black seed of Ayurveda — primary treatment for vitiligo and bone health for 2,500 years.",
    history:
      "Sushruta Samhita prescribes it as primary treatment for depigmentation conditions.",
    traditional:
      "Seed powder applied topically for vitiligo; taken internally for bone weakness.",
    modern:
      "Bakuchiol (an alternative to retinol) now widely used in natural anti-aging skincare.",
    future:
      "Psoralen phototherapy protocols being refined for targeted vitiligo re-pigmentation.",
  },
  {
    id: 69,
    name: "Haridra Kanda",
    latin: "Curcuma zedoaria",
    emoji: "🟡",
    color: "#B87A10",
    accent: "#E0AA40",
    region: "India & SE Asia",
    era: "700 CE",
    ayush: "Ayurveda",
    tags: ["Digestive", "Anti-cancer", "Anti-inflammatory"],
    summary:
      "White turmeric — a lesser-known Curcuma species with potent anti-cancer and digestive properties.",
    history:
      "Used in Ayurveda and traditional Thai medicine for digestive complaints and cancer.",
    traditional:
      "Rhizome decoction for indigestion, flatulence, and post-fever digestive weakness.",
    modern:
      "Curcumenol shows antitumor activity against cervical and breast cancer cell lines.",
    future:
      "Zedoarondiol being investigated as chemo-sensitizing agent for resistant tumors.",
  },
  {
    id: 70,
    name: "Rasna",
    latin: "Pluchea indica",
    emoji: "🌿",
    color: "#5A7850",
    accent: "#8AB880",
    region: "India",
    era: "600 CE",
    ayush: "Ayurveda",
    tags: ["Anti-rheumatic", "Pain Relief", "Respiratory"],
    summary:
      "The sacred healing herb of Ayurveda for joint pain, sciatica, and respiratory conditions.",
    history:
      "Ashtanga Hridayam describes rasna as the foremost herb for vata disorders (joint and nerve pain).",
    traditional:
      "Leaf and root decoction for rheumatoid arthritis, sciatica, and upper respiratory infections.",
    modern:
      "Sesquiterpene lactones in rasna show anti-inflammatory activity in arthritis models.",
    future:
      "Sesquiterpene formulations being standardized for rheumatoid arthritis management.",
  },
  {
    id: 71,
    name: "Kushta",
    latin: "Saussurea lappa",
    emoji: "🌼",
    color: "#8A70A0",
    accent: "#C0A8D8",
    region: "Himalayas",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Respiratory", "Anti-inflammatory", "Skin Care"],
    summary:
      "Himalayan costus — one of the rarest and most potent Ayurvedic herbs for respiratory and skin.",
    history:
      "Among the most prized herbs of ancient India; exported along the Silk Road.",
    traditional:
      "Root powder for asthma, bronchitis, chronic skin diseases, and rheumatic conditions.",
    modern:
      "Dehydrocostus lactone shows anti-inflammatory and anti-tumor activity in vitro.",
    future:
      "Costunolide derivatives being investigated for anti-tumor and anti-metastatic properties.",
  },
  {
    id: 72,
    name: "Apamarga",
    latin: "Achyranthes aspera",
    emoji: "🌿",
    color: "#5A7A3A",
    accent: "#8AB860",
    region: "India & Tropics",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Diuretic", "Anti-inflammatory", "Wound Healing"],
    summary:
      "Prickly chaff flower — used in Ayurveda for urinary tract health, snakebite, and wound healing.",
    history:
      "Charaka Samhita lists it as a primary herb for vata and kapha disorders.",
    traditional:
      "Ash applied to teeth for oral health; leaf juice for snakebite; decoction for urinary conditions.",
    modern:
      "Ecdysterone shows anabolic activity; oleanolic acid demonstrates anti-inflammatory properties.",
    future:
      "Ecdysteroid compounds being investigated for muscle-building without androgenic side effects.",
  },
  {
    id: 73,
    name: "Vasa",
    latin: "Adhatoda vasica",
    emoji: "🌿",
    color: "#4A7A50",
    accent: "#78B878",
    region: "India & SE Asia",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Respiratory", "Anti-asthmatic", "Expectorant"],
    summary:
      "Malabar nut — Ayurveda's most important expectorant and bronchodilator for respiratory disease.",
    history:
      "Charaka Samhita lists vasa among the most important herbs for cough and breathing disorders.",
    traditional:
      "Leaf juice with honey for asthma, bronchitis, tuberculosis, and whooping cough.",
    modern:
      "Vasicine shows bronchodilatory activity; vasicine derivatives developed into ambroxol.",
    future:
      "Dextromethorphan-vasicine combination being tested for resistant asthma management.",
  },
  {
    id: 74,
    name: "Kantakari",
    latin: "Solanum xanthocarpum",
    emoji: "🌸",
    color: "#A05080",
    accent: "#D880B8",
    region: "India",
    era: "600 CE",
    ayush: "Ayurveda",
    tags: ["Respiratory", "Anti-asthmatic", "Febrifuge"],
    summary:
      "Yellow berried nightshade — Ayurveda's spiny healer for respiratory and asthmatic conditions.",
    history:
      "Charaka describes it as one of the ten small plants (laghu panchamula) for respiratory health.",
    traditional:
      "Root decoction for asthma, cough, fever, and dysuria in traditional practice.",
    modern:
      "Solanidine shows smooth muscle relaxation; anti-asthmatic properties partially confirmed.",
    future:
      "Steroidal alkaloids from kantakari being investigated for anti-inflammatory drug development.",
  },
  {
    id: 75,
    name: "Brihati",
    latin: "Solanum indicum",
    emoji: "🫐",
    color: "#5A3A8A",
    accent: "#9070C0",
    region: "India",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Respiratory", "Anti-asthmatic", "Pain Relief"],
    summary:
      "The large nightshade of Ayurveda — essential herb in the Dashamoola (ten roots) formula.",
    history:
      "One of the ten roots in the classical Dashamoola formula for systemic health.",
    traditional:
      "Root decoction for respiratory conditions, fever, and pain management.",
    modern:
      "Steroidal alkaloids show bronchodilatory and anti-inflammatory activity in studies.",
    future:
      "Dashamoola combination being standardized for Phase II clinical trials for asthma.",
  },
  {
    id: 76,
    name: "Mandukparni",
    latin: "Centella asiatica var.",
    emoji: "🍀",
    color: "#4A7A60",
    accent: "#78B890",
    region: "India",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Cognitive", "Wound Healing", "Anti-anxiety"],
    summary:
      "Brahmi's cousin — mandukparni is the classical brain tonic of Ayurveda for memory and clarity.",
    history:
      "Charaka Samhita's most referenced medhya (intellect-promoting) herb alongside brahmi.",
    traditional:
      "Fresh leaf juice for memory enhancement; paste for wound healing and skin infections.",
    modern:
      "Centellasaponins improve spatial learning and reduce anxiety in behavioral animal models.",
    future:
      "Standardized centella extract being developed for age-related memory decline prevention.",
  },
  {
    id: 77,
    name: "Patola",
    latin: "Trichosanthes dioica",
    emoji: "🥬",
    color: "#4A8A40",
    accent: "#78C068",
    region: "India",
    era: "600 CE",
    ayush: "Ayurveda",
    tags: ["Digestive", "Fever", "Anti-diabetic"],
    summary:
      "Pointed gourd — both food and medicine in Ayurveda for digestive fire and blood sugar control.",
    history:
      "Charaka Samhita documents patola as essential in bitter vegetable formulas for pitta disorders.",
    traditional:
      "Leaves and fruit for jaundice, fever, blood purification, and constipation.",
    modern:
      "Saponins from patola leaf show hypoglycemic activity comparable to oral anti-diabetics.",
    future:
      "Cucurbitacin glycosides being investigated for anti-hepatitis B and antitumor applications.",
  },
  {
    id: 78,
    name: "Hawthorn",
    latin: "Crataegus monogyna",
    emoji: "🫀",
    color: "#C03050",
    accent: "#E87080",
    region: "Europe & Asia",
    era: "200 CE",
    ayush: "Naturopathy",
    tags: ["Heart Health", "Anti-hypertensive", "Antioxidant"],
    summary:
      "The heart berry — European naturopathy's most trusted herb for cardiac health and hypertension.",
    history:
      "Used in traditional European medicine for 2,000 years for heart and circulatory conditions.",
    traditional:
      "Berry extract for heart failure, palpitations, and anxiety in Western herbal tradition.",
    modern:
      "OPC proanthocyanidins improve cardiac output and reduce peripheral resistance in RCTs.",
    future:
      "Hawthorn standardized extract in Phase III trials for mild-moderate heart failure.",
  },
  {
    id: 79,
    name: "Echinacea",
    latin: "Echinacea purpurea",
    emoji: "🌸",
    color: "#C05080",
    accent: "#E888A8",
    region: "North America",
    era: "400 CE",
    ayush: "Naturopathy",
    tags: ["Immunity", "Antiviral", "Wound Healing"],
    summary:
      "Purple coneflower — Native American immune herb now the world's best-selling herbal supplement.",
    history:
      "Used by 14 Native American nations for infections, wounds, and as a general tonic.",
    traditional:
      "Root chewed for toothache, wounds, and infections; decoction for cold and fever.",
    modern:
      "Reduces cold duration by 1.4 days and severity in meta-analysis of 24 clinical trials.",
    future:
      "Alkylamide compounds from Echinacea being standardized for immunostimulant drug development.",
  },
  {
    id: 80,
    name: "Valerian",
    latin: "Valeriana officinalis",
    emoji: "💤",
    color: "#6A5A9A",
    accent: "#9A8AD8",
    region: "Europe & Asia",
    era: "400 BCE",
    ayush: "Naturopathy",
    tags: ["Sleep", "Calming", "Antispasmodic"],
    summary:
      "Nature's tranquilizer — valerian root has helped humans sleep for more than 2,400 years.",
    history:
      "Hippocrates described valerian as a remedy for insomnia; Galen prescribed it for nervousness.",
    traditional:
      "Root decoction for insomnia, anxiety, nervous tension, and muscle cramps.",
    modern:
      "Valerenic acid binds GABA-A receptors; meta-analysis supports efficacy for sleep quality.",
    future:
      "Valerenic acid derivatives being developed as non-addictive GABA modulators for anxiety.",
  },
  {
    id: 81,
    name: "Milk Thistle",
    latin: "Silybum marianum",
    emoji: "🌸",
    color: "#A050A0",
    accent: "#D880D8",
    region: "Mediterranean",
    era: "77 CE",
    ayush: "Naturopathy",
    tags: ["Liver Health", "Detox", "Antioxidant"],
    summary:
      "The liver's guardian — silymarin from milk thistle is the world's most evidence-backed liver herb.",
    history:
      "Pliny the Elder (77 CE) documented it for bile duct disorders. Monasteries cultivated it medicinally.",
    traditional:
      "Seeds ground for liver protection; taken by foragers who accidentally consumed toxic mushrooms.",
    modern:
      "Silymarin reduces liver enzymes in hepatitis; approved as hepatoprotective drug in Europe.",
    future:
      "Silymarin nanoparticles for improved bioavailability in NAFLD treatment under development.",
  },
  {
    id: 82,
    name: "St. John's Wort",
    latin: "Hypericum perforatum",
    emoji: "⭐",
    color: "#C8A820",
    accent: "#F0D840",
    region: "Europe",
    era: "200 BCE",
    ayush: "Naturopathy",
    tags: ["Mood", "Anti-depressant", "Antiviral"],
    summary:
      "The sunshine herb — validated by 30+ clinical trials as effective as SSRIs for mild depression.",
    history:
      "Used in ancient Greek medicine; named St. John's Wort as it blooms around St. John's Day.",
    traditional:
      "Oil for wound healing; tea for depression, anxiety, and nerve pain.",
    modern:
      "Hypericin and hyperforin outperform placebo and match SSRIs in mild-moderate depression RCTs.",
    future:
      "Hyperforin being investigated for Alzheimer's prevention via amyloid beta inhibition.",
  },
  {
    id: 83,
    name: "Ginkgo",
    latin: "Ginkgo biloba",
    emoji: "🍃",
    color: "#8A9A20",
    accent: "#C8D840",
    region: "China",
    era: "2800 BCE",
    ayush: "TCM",
    tags: ["Cognitive", "Circulatory", "Anti-aging"],
    summary:
      "The living fossil — the oldest tree species on earth with proven cognitive and circulatory benefits.",
    history:
      "Survived the dinosaur age; Chinese emperors used it as a longevity and brain tonic.",
    traditional:
      "Seeds and leaves for memory, asthma, urinary incontinence, and circulatory disorders.",
    modern:
      "EGb761 extract improves cognitive function in dementia; reduces tinnitus in clinical trials.",
    future:
      "Ginkgolide J being investigated for protection against post-stroke neuronal damage.",
  },
  {
    id: 84,
    name: "Saw Palmetto",
    latin: "Serenoa repens",
    emoji: "🌴",
    color: "#5A8A50",
    accent: "#88C070",
    region: "North America",
    era: "1700 CE",
    ayush: "Naturopathy",
    tags: ["Men's Health", "Prostate", "Hormonal"],
    summary:
      "The palm of men's health — saw palmetto berry extract for benign prostatic hyperplasia.",
    history:
      "Used by Seminole Native Americans for food and medicine; adopted by eclectic physicians.",
    traditional:
      "Berries as food and medicine for urinary and reproductive conditions.",
    modern:
      "Beta-sitosterol inhibits 5-alpha reductase; reduces BPH symptoms in multiple RCTs.",
    future:
      "Standardized liposterolic extract being compared to finasteride in Phase III prostate trials.",
  },
  {
    id: 85,
    name: "Senna",
    latin: "Cassia senna",
    emoji: "🌿",
    color: "#8A8040",
    accent: "#C0B860",
    region: "Africa & India",
    era: "900 CE",
    ayush: "Unani",
    tags: ["Laxative", "Digestive", "Detox"],
    summary:
      "The gentle purger — senna leaf is the most medically prescribed herbal laxative globally.",
    history:
      "Arab physicians first documented senna in the 9th century; exported globally by the 10th.",
    traditional:
      "Leaf infusion for constipation and bowel cleansing in Unani and Ayurvedic practice.",
    modern:
      "Sennoside A and B work as effective osmotic laxatives; approved globally for constipation.",
    future:
      "Senna glycoside delivery systems being optimized for controlled-release colon health products.",
  },
  {
    id: 86,
    name: "Tribulus",
    latin: "Tribulus terrestris",
    emoji: "🌱",
    color: "#8A7A30",
    accent: "#C0B050",
    region: "Mediterranean & India",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Athletic", "Men's Health", "Kidney Health"],
    summary:
      "Puncture vine — Ayurvedic athletic herb used across three continents for vitality and stamina.",
    history:
      "Used in ancient Greece for vitality and in Ayurveda as a kidney and reproductive tonic.",
    traditional:
      "Fruit powder for urinary gravel, sexual weakness, and to enhance physical endurance.",
    modern:
      "Protodioscin increases testosterone; mild diuretic and antimicrobial effects confirmed.",
    future:
      "Novel steroid saponins from tribulus being screened for anabolic and adaptogenic effects.",
  },
  {
    id: 87,
    name: "Black Cohosh",
    latin: "Actaea racemosa",
    emoji: "🌸",
    color: "#8A5060",
    accent: "#C08090",
    region: "North America",
    era: "1700 CE",
    ayush: "Naturopathy",
    tags: ["Women's Health", "Menopause", "Hormonal"],
    summary:
      "Rattlesnake root — North American herb clinically proven to reduce menopause hot flashes.",
    history:
      "Used by Algonquian peoples for menstrual disorders; adopted by eclectic physicians in 1800s.",
    traditional:
      "Root for menstrual cramps, menopause, rheumatism, and nervous tension.",
    modern:
      "Reduces hot flash frequency by 26% in meta-analysis; mechanism via serotonin receptors.",
    future:
      "Triterpene glycosides standardized for menopausal hormone therapy alternative development.",
  },
  {
    id: 88,
    name: "Maca",
    latin: "Lepidium meyenii",
    emoji: "🥔",
    color: "#A08050",
    accent: "#D0B878",
    region: "Andes, Peru",
    era: "200 BCE",
    ayush: "Naturopathy",
    tags: ["Energy", "Hormonal", "Fertility"],
    summary:
      "Peruvian ginseng — the high-altitude superfood adaptogen for fertility, energy, and endurance.",
    history:
      "Inca warriors consumed maca before battle for strength and endurance.",
    traditional:
      "Root consumed as food and medicine for fertility, stamina, and altitude adaptation.",
    modern:
      "Benzylglucosinolates improve sexual function and fertility in both men and women in RCTs.",
    future:
      "Maca alkaloids being studied for treatment of sexual dysfunction induced by antidepressants.",
  },
  {
    id: 89,
    name: "Passion Flower",
    latin: "Passiflora incarnata",
    emoji: "🌺",
    color: "#7A60A0",
    accent: "#B090D8",
    region: "Americas",
    era: "1500 CE",
    ayush: "Naturopathy",
    tags: ["Calming", "Sleep", "Antispasmodic"],
    summary:
      "The passion vine — Native American calming herb now validated for anxiety and sleep disorders.",
    history:
      "Spanish explorers found it in Peru; named for Christ's passion due to flower's symbolism.",
    traditional:
      "Leaf tea for insomnia, epilepsy, neuralgia, and anxiety in North American herbal tradition.",
    modern:
      "Chrysin and vitexin bind GABA-A receptors; RCTs confirm efficacy for generalized anxiety.",
    future:
      "Passiflorine being developed as anxiolytic with superior tolerability to benzodiazepines.",
  },
  {
    id: 90,
    name: "Rhodiola",
    latin: "Rhodiola rosea",
    emoji: "🌸",
    color: "#C05060",
    accent: "#E88090",
    region: "Arctic & Siberia",
    era: "400 CE",
    ayush: "Naturopathy",
    tags: ["Adaptogen", "Energy", "Cognitive"],
    summary:
      "Arctic root — the Viking and Sherpa adaptogen for stress resilience and altitude adaptation.",
    history:
      "Used by Vikings for strength and endurance; Soviet military used it to enhance soldier performance.",
    traditional:
      "Root for fatigue, altitude sickness, depression, and physical endurance in harsh climates.",
    modern:
      "Salidroside and rosavins improve stress resilience; 36 clinical trials confirm cognitive benefits.",
    future:
      "Salidroside neuroprotective properties being investigated for Parkinson's disease prevention.",
  },
  {
    id: 91,
    name: "Ashitaba",
    latin: "Angelica keiskei",
    emoji: "🌿",
    color: "#3A7A50",
    accent: "#68B878",
    region: "Japan",
    era: "600 CE",
    ayush: "Naturopathy",
    tags: ["Anti-aging", "Detox", "Longevity"],
    summary:
      "Tomorrow's leaf — the Japanese longevity herb that grows back the day after being picked.",
    history:
      "Eaten as food on Japanese Hachijo Island, famous for its long-lived population.",
    traditional:
      "Leaves consumed fresh or as tea for longevity, liver health, and energy enhancement.",
    modern:
      "Chalcones in ashitaba activate autophagy — the cellular self-cleaning process linked to longevity.",
    future:
      "Ashitaba chalcones (DMC) being investigated as autophagy activators for anti-aging therapy.",
  },
  {
    id: 92,
    name: "Dong Quai",
    latin: "Angelica sinensis",
    emoji: "🌸",
    color: "#C06880",
    accent: "#E8A0B0",
    region: "China",
    era: "200 BCE",
    ayush: "TCM",
    tags: ["Women's Health", "Blood Tonic", "Pain Relief"],
    summary:
      "Female emperor herb — TCM's supreme women's tonic for blood, menstrual health, and pain.",
    history:
      "Second only to ginseng in Chinese historical use; prescribed for women's conditions for 2,000 years.",
    traditional:
      "Root in soups and decoctions for anemia, menstrual irregularity, and infertility.",
    modern:
      "Ferulic acid shows uterine relaxant and blood-thinning effects; phytoestrogen activity modest.",
    future:
      "Angelica polysaccharides being investigated for immune modulation and blood disorder treatment.",
  },
  {
    id: 93,
    name: "Bugleweed",
    latin: "Lycopus virginicus",
    emoji: "🌿",
    color: "#5A7A40",
    accent: "#88B868",
    region: "North America",
    era: "1800 CE",
    ayush: "Naturopathy",
    tags: ["Thyroid", "Heart Health", "Calming"],
    summary:
      "Virginian water horehound — North American herb for hyperthyroid conditions and heart palpitations.",
    history:
      "Used by Native Americans for fever and bleeding; adopted by eclectic physicians for thyroid.",
    traditional:
      "Leaf tincture for rapid heartbeat, palpitations, and mild hyperthyroid symptoms.",
    modern:
      "Lycopin inhibits thyroid-stimulating hormone binding; reduces T4 to T3 conversion.",
    future:
      "Lycopene derivatives being investigated as natural thyroid modulators for Graves' disease.",
  },
  {
    id: 94,
    name: "Marshmallow",
    latin: "Althaea officinalis",
    emoji: "🌸",
    color: "#D08090",
    accent: "#F0B0C0",
    region: "Europe & W. Asia",
    era: "200 BCE",
    ayush: "Naturopathy",
    tags: ["Respiratory", "Digestive", "Soothing"],
    summary:
      "The original marshmallow — the demulcent herb that soothes every mucous membrane it touches.",
    history:
      "Hippocrates used it for wounds; its root extract was used to make the original marshmallow candy.",
    traditional:
      "Root tea for coughs, gastritis, urinary tract irritation, and wound healing.",
    modern:
      "Polysaccharide mucilage coats and protects mucous membranes; soothing activity confirmed.",
    future:
      "Althaea polysaccharide films being developed for mucosal drug delivery applications.",
  },
  {
    id: 95,
    name: "Turmeric Zedoary",
    latin: "Curcuma zedoaria",
    emoji: "🟡",
    color: "#B07020",
    accent: "#D8A040",
    region: "India & SE Asia",
    era: "700 CE",
    ayush: "Ayurveda",
    tags: ["Digestive", "Anti-cancer", "Anti-inflammatory"],
    summary:
      "White zedoary — the underappreciated Curcuma species with unique anti-cancer properties.",
    history:
      "Used in Ayurveda and Thai traditional medicine for digestive and gynecological conditions.",
    traditional:
      "Rhizome paste applied externally for skin conditions; decoction for indigestion.",
    modern:
      "Curcumenol shows selective cytotoxicity against liver and cervical cancer cell lines.",
    future:
      "Furanodiene derivatives being tested in combination with chemotherapy for tumor sensitization.",
  },
  {
    id: 96,
    name: "Nigella",
    latin: "Nigella sativa",
    emoji: "🌑",
    color: "#2A2A4A",
    accent: "#5050A0",
    region: "Mediterranean & India",
    era: "3000 BCE",
    ayush: "Unani",
    tags: ["Immunity", "Anti-diabetic", "Respiratory"],
    summary:
      "Black seed — the Quran's herb of healing, validated across 458 studies for diverse conditions.",
    history:
      "Found in Tutankhamun's tomb. Islamic texts say it cures everything except death.",
    traditional:
      "Seeds with honey for immunity; oil for respiratory infections and skin conditions.",
    modern:
      "Thymoquinone reduces fasting glucose by 18%; anti-tumor, antiviral, and anti-asthmatic confirmed.",
    future:
      "Thymoquinone nanoparticles in pre-clinical trials for triple-negative breast cancer.",
  },
  {
    id: 97,
    name: "Ashoka",
    latin: "Saraca asoca",
    emoji: "🌺",
    color: "#C06040",
    accent: "#E09060",
    region: "India",
    era: "600 BCE",
    ayush: "Ayurveda",
    tags: ["Women's Health", "Hormonal", "Uterine"],
    summary:
      "The tree of no sorrow — Ayurveda's sacred tree for women's uterine and hormonal health.",
    history:
      "Sacred to Buddhists and Hindus; Sita rested under an ashoka tree in the Ramayana.",
    traditional:
      "Bark decoction for uterine fibroids, endometriosis, and excessive menstrual bleeding.",
    modern:
      "Catechins and tannins in ashoka bark show uterine contractile and hemostatic activity.",
    future:
      "Ashokarishta formulation being validated against GnRH analogs for uterine fibroid management.",
  },
  {
    id: 98,
    name: "Bilva",
    latin: "Aegle marmelos",
    emoji: "🫒",
    color: "#7A9030",
    accent: "#B0C850",
    region: "India",
    era: "2000 BCE",
    ayush: "Ayurveda",
    tags: ["Digestive", "Sacred", "Anti-diabetic"],
    summary:
      "The bel tree — sacred to Shiva and medicinally significant for digestive and metabolic health.",
    history:
      "Leaves are sacred in Hindu worship; tree is one of the most important in Ayurvedic tradition.",
    traditional:
      "Unripe fruit for diarrhea; ripe fruit as cooling summer beverage; leaves in temple rituals.",
    modern:
      "Marmelosin shows antimicrobial properties; beta-sitosterol reduces blood glucose.",
    future:
      "Bael polysaccharides being developed as functional food ingredients for metabolic syndrome.",
  },
  {
    id: 99,
    name: "Punarnava Shatavari",
    latin: "Boerhavia & Asparagus",
    emoji: "🌿",
    color: "#5A8A60",
    accent: "#88C090",
    region: "India",
    era: "600 CE",
    ayush: "Ayurveda",
    tags: ["Women's Health", "Kidney Health", "Adaptogen"],
    summary:
      "The renewal pair — classical Ayurvedic formula combining kidney support with hormonal balance.",
    history:
      "Combined formula found in classical texts for treating both urinary and reproductive conditions.",
    traditional:
      "Combined decoction for edema, urinary tract infections, and female hormonal balance.",
    modern:
      "Combination shows synergistic diuretic and anti-inflammatory activity in studies.",
    future:
      "Standardized combination extract being developed for polycystic kidney disease management.",
  },
  {
    id: 100,
    name: "Sandalwood",
    latin: "Santalum album",
    emoji: "🪵",
    color: "#C09060",
    accent: "#E8C090",
    region: "India & Australia",
    era: "4000 BCE",
    ayush: "Ayurveda",
    tags: ["Skin Care", "Calming", "Antimicrobial"],
    summary:
      "Sacred white sandalwood — the aromatic healer of Ayurveda for skin, mind, and spirit.",
    history:
      "Used for 4,000 years in Indian temple rituals; most expensive wood per gram in the world.",
    traditional:
      "Paste for skin inflammation, headaches, and fever; oil for meditation and anxiety.",
    modern:
      "Alpha-santalol induces apoptosis in skin cancer cells; antimicrobial against acne bacteria.",
    future:
      "Santalol-based topical formulations in Phase II trials for non-melanoma skin cancer.",
  },
];

// ─── GARDEN DATA ──────────────────────────────────────────────────────────
const GARDEN_METHODS = [
  {
    id: "home",
    title: "Home Garden",
    icon: "🏡",
    color: "#4A6741",
    accent: "#8FBF82",
    tag: "Most Space",
    difficulty: "Beginner",
    space: "10–100+ sq ft",
    sunlight: "Full sun",
    water: "2–3× /week",
    invest: "₹500–₹3,000",
    description:
      "Classic ground-level growing — richest conditions for large medicinal trees, shrubs, and creeping herbs.",
    bestFor: [
      "Large plants & trees",
      "Root herbs",
      "Creepers & climbers",
      "Year-round harvests",
    ],
    tips: [
      {
        icon: "🌱",
        title: "Soil Preparation",
        body: "Dig 12 inches deep. Mix 40% garden soil, 30% vermicompost, 20% coarse sand, 10% neem cake. Perfect soil holds moisture without waterlogging.",
      },
      {
        icon: "☀️",
        title: "Sun Mapping",
        body: "Place sun-lovers (Tulsi, Neem, Turmeric) where 6+ hours of sun falls. Shade-tolerant plants like Brahmi thrive in dappled afternoon spots.",
      },
      {
        icon: "💧",
        title: "Deep Watering",
        body: "Deep, infrequent watering beats shallow daily watering. Water at the base — never leaves — to prevent fungal disease.",
      },
      {
        icon: "🌿",
        title: "Companion Planting",
        body: "Plant Marigold at borders to repel pests. Tulsi deters aphids and whitefly. Neem tree canopy provides natural pest pressure reduction.",
      },
      {
        icon: "♻️",
        title: "Composting",
        body: "Compost kitchen scraps, dry leaves, and herb clippings. Rich humus ready in 45–60 days.",
      },
      {
        icon: "📅",
        title: "Seasonal Rotation",
        body: "Rotate plant families across beds each season to break pest cycles and prevent nutrient depletion.",
      },
    ],
    plants: [
      "Ashwagandha",
      "Turmeric",
      "Neem",
      "Holy Basil",
      "Moringa",
      "Aloe Vera",
      "Brahmi",
      "Shatavari",
      "Amla",
      "Ginger",
      "Curry Leaf",
      "Elderberry",
    ],
    seasonal: [
      {
        season: "☀️ Summer",
        tip: "Plant heat-lovers: Tulsi, Neem, Moringa. Mulch heavily. Water in early morning only.",
      },
      {
        season: "🌧️ Monsoon",
        tip: "Ideal for Brahmi, Gotu Kola, Ginger, Turmeric. Watch for fungal rot and improve drainage.",
      },
      {
        season: "❄️ Winter",
        tip: "Best for Ashwagandha, Fenugreek, Chamomile. Protect tender tropicals from cold nights.",
      },
    ],
  },
  {
    id: "terrace",
    title: "Terrace Garden",
    icon: "🏗️",
    color: "#8A5030",
    accent: "#D4956A",
    tag: "Urban Solution",
    difficulty: "Intermediate",
    space: "50–500 sq ft",
    sunlight: "Full sun + shade net",
    water: "Daily in summer",
    invest: "₹3,000–₹25,000",
    description:
      "Transform your rooftop into a therapeutic oasis. Terrace gardens maximize unused urban space for year-round medicinal herb production.",
    bestFor: [
      "Urban families",
      "Container growing",
      "Micro-climate creation",
      "Rooftop aesthetics",
    ],
    tips: [
      {
        icon: "⚖️",
        title: "Structural Check",
        body: "Consult a structural engineer first. Use lightweight HDPE containers and coir media — reduces weight by 40% vs clay soil.",
      },
      {
        icon: "🛡️",
        title: "Waterproofing",
        body: "Apply polyurethane or bituminous waterproofing before any soil or containers. Elevate pots on plastic feet.",
      },
      {
        icon: "💨",
        title: "Wind Management",
        body: "Install bamboo or jute windbreaks on exposed sides. Stake all tall plants — terrace winds snap stems.",
      },
      {
        icon: "💧",
        title: "Drip Irrigation",
        body: "Timer-controlled drip saves 60% water. Terraces dry 2× faster than ground. Essential for consistent growth.",
      },
      {
        icon: "🌡️",
        title: "Shade Net",
        body: "Use 50% shade net April–June. Most herbs suffer leaf scorch above 42°C. Remove in cooler months.",
      },
      {
        icon: "🪣",
        title: "Container Selection",
        body: 'Fabric grow bags offer best drainage and root aeration. Minimum 12" depth for herbs, 24"+ for trees.',
      },
    ],
    plants: [
      "Tulsi",
      "Lemongrass",
      "Mint",
      "Aloe Vera",
      "Curry Leaf",
      "Rosemary",
      "Lavender",
      "Gotu Kola",
      "Fenugreek",
      "Peppermint",
      "Marigold",
      "Stevia",
    ],
    seasonal: [
      {
        season: "☀️ Summer",
        tip: "Shade nets mandatory. Double watering. Mulch containers with coco peat.",
      },
      {
        season: "🌧️ Monsoon",
        tip: "Check drainage. Elevate pots on bricks. Prune for airflow.",
      },
      {
        season: "❄️ Winter",
        tip: "Maximum growing season. Harvest intensively. Cover tropical plants on cold nights.",
      },
    ],
  },
  {
    id: "kitchen",
    title: "Kitchen Garden",
    icon: "🍳",
    color: "#C8780A",
    accent: "#F0B050",
    tag: "Most Practical",
    difficulty: "Beginner",
    space: "4–20 sq ft",
    sunlight: "4–6 hours min",
    water: "Every 1–2 days",
    invest: "₹300–₹1,500",
    description:
      "Culinary-medicinal plants within arm's reach. Research shows herbs within 3 steps of the kitchen are harvested 5× more.",
    bestFor: [
      "Daily cooking herbs",
      "Quick harvests",
      "Budget-conscious",
      "Small households",
    ],
    tips: [
      {
        icon: "📍",
        title: "Location First",
        body: "Within 3 steps of your kitchen door. South or east-facing window for optimal morning light.",
      },
      {
        icon: "🪴",
        title: "Three-Tier Shelf",
        body: "Bottom tier: shade-tolerant (Mint, Brahmi). Middle: medium sun (Lemongrass). Top: full sun (Tulsi, Rosemary).",
      },
      {
        icon: "✂️",
        title: "Cut-and-Come-Again",
        body: "Cut 1/3 down from the top, just above a leaf node. Forces bushy regrowth. Never strip all leaves.",
      },
      {
        icon: "🌱",
        title: "The Essential Six",
        body: "Start with: Tulsi, Curry Leaf, Ginger, Mint, Lemongrass, Coriander — covers 80% of kitchen-medicinal needs.",
      },
      {
        icon: "💧",
        title: "Self-Watering Pots",
        body: "Self-watering containers with reservoir bases provide 3–5 days of autonomous moisture — perfect for busy cooks.",
      },
      {
        icon: "🧪",
        title: "Indoor Soil Formula",
        body: "50% potting mix + 30% compost + 20% perlite. Avoid garden soil indoors — it compacts and harbors pests.",
      },
    ],
    plants: [
      "Tulsi",
      "Curry Leaf",
      "Mint",
      "Coriander",
      "Fenugreek",
      "Ginger",
      "Turmeric",
      "Lemongrass",
      "Rosemary",
      "Thyme",
      "Stevia",
      "Brahmi",
    ],
    seasonal: [
      {
        season: "🌿 All Year",
        tip: "Tulsi, Curry Leaf, Aloe Vera — maintain 12 months as anchors. Rotate seasonal herbs around them.",
      },
      {
        season: "❄️ Cool Months",
        tip: "Ideal for Coriander, Fenugreek, Mint. Germination is 2× faster in cooler temperatures.",
      },
      {
        season: "☀️ Warm Months",
        tip: "Ginger and Turmeric rhizomes grow vigorously. Harvest Tulsi before it flowers for maximum potency.",
      },
    ],
  },
  {
    id: "balcony",
    title: "Balcony Garden",
    icon: "🌆",
    color: "#3A6A8A",
    accent: "#70A8D0",
    tag: "Apartment Friendly",
    difficulty: "Beginner",
    space: "4–30 sq ft",
    sunlight: "Varies by orientation",
    water: "Daily in summer",
    invest: "₹800–₹6,000",
    description:
      "Even a 4×6 ft balcony can become a thriving medicinal sanctuary with vertical growing and smart containers.",
    bestFor: [
      "Apartment dwellers",
      "Vertical growing",
      "Aesthetic gardens",
      "Beginner growers",
    ],
    tips: [
      {
        icon: "📐",
        title: "Go Vertical",
        body: "Use wall-mounted felt pockets, tiered stands, bamboo trellises for climbers, and hanging baskets. Double your area without floor space.",
      },
      {
        icon: "🪟",
        title: "Orientation Strategy",
        body: "East-facing: perfect for Brahmi, Gotu Kola, Mint. West-facing: great for Tulsi, Rosemary, Lavender. North: Aloe Vera only.",
      },
      {
        icon: "🌿",
        title: "Rail Planters",
        body: "Rail-mounted planters consume zero floor space. Ideal for trailing Mint and Brahmi. Clamp safely to railing.",
      },
      {
        icon: "🏺",
        title: "Container Strategy",
        body: 'One 18" anchor pot (Tulsi/Curry Leaf), several 10" pots for herbs, small 6" pots for seasonal fills.',
      },
      {
        icon: "🌈",
        title: "Design for Beauty",
        body: "Lavender's purple + Marigold's orange + Tulsi's green creates a therapeutic palette that attracts pollinators.",
      },
      {
        icon: "🌧️",
        title: "Drainage Critical",
        body: "Pots with drainage holes always. Place pebbles at pot bottoms. Clear drainage channels monthly before monsoon.",
      },
    ],
    plants: [
      "Tulsi",
      "Lavender",
      "Mint",
      "Brahmi",
      "Gotu Kola",
      "Rosemary",
      "Lemon Balm",
      "Marigold",
      "Aloe Vera",
      "Stevia",
      "Chamomile",
      "Thyme",
    ],
    seasonal: [
      {
        season: "☀️ Summer",
        tip: "Hang shade cloth on railing. Water twice daily in peak heat. Move pots to morning-sun positions.",
      },
      {
        season: "🌧️ Monsoon",
        tip: "Move pots away from direct rain if drainage insufficient. Great season for Brahmi and Gotu Kola.",
      },
      {
        season: "❄️ Winter",
        tip: "Best-looking season. Move tender tropicals indoors. Install fairy lights for warmth and light.",
      },
    ],
  },
  {
    id: "indoor",
    title: "Indoor Garden",
    icon: "🛋️",
    color: "#5A3A8A",
    accent: "#9A70D0",
    tag: "No Outdoor Space",
    difficulty: "Easy",
    space: "Any",
    sunlight: "Indirect or grow lights",
    water: "Weekly",
    invest: "₹500–₹8,000",
    description:
      "Selected medicinal plants thrive under artificial or indirect light while purifying air and providing on-demand herbal harvests.",
    bestFor: [
      "Air purification",
      "Low-light spaces",
      "No outdoor access",
      "Minimal maintenance",
    ],
    tips: [
      {
        icon: "💡",
        title: "Grow Lights",
        body: "Full-spectrum LED (4000–6500K) runs 12–16 hrs daily. A 20W panel covers a 2×2 ft garden for under ₹50/month.",
      },
      {
        icon: "🌡️",
        title: "Humidity & Temp",
        body: "Most herbs thrive at 18–26°C. Group plants together (mutual transpiration), or use a pebble tray with water.",
      },
      {
        icon: "💨",
        title: "Air Circulation",
        body: "Run a small fan 2–3 hrs daily. Prevents mold and strengthens stems via thigmomorphogenesis.",
      },
      {
        icon: "🧴",
        title: "Fertilizing",
        body: "Liquid seaweed extract every 2 weeks, or diluted vermicompost tea monthly. Never over-fertilize.",
      },
      {
        icon: "🔄",
        title: "Rotate Regularly",
        body: "Rotate pots 90° weekly so all sides receive equal light. Prevents asymmetric 'reaching' toward light sources.",
      },
      {
        icon: "🐛",
        title: "Pest Prevention",
        body: "Fungus gnats: let soil dry between waterings. Spider mites: raise humidity. Mealybugs: neem oil solution.",
      },
    ],
    plants: [
      "Aloe Vera",
      "Tulsi",
      "Brahmi",
      "Gotu Kola",
      "Lemon Balm",
      "Chamomile",
      "Lavender",
      "Peppermint",
      "Stevia",
      "Kalanchoe",
      "Snake Plant",
    ],
    seasonal: [
      {
        season: "🌿 All Year",
        tip: "Simulate seasons with light: 14 hrs summer, 10 hrs winter. Season-independent growing with proper lighting.",
      },
      {
        season: "❄️ Winter",
        tip: "Central heating drops humidity to 20–30%. Mist plants daily or use a humidifier at 50–60% RH.",
      },
      {
        season: "☀️ Summer",
        tip: "Reduce grow light hours as natural light increases. Watch for leaf scorch on south-facing windows.",
      },
    ],
  },
  {
    id: "vertical",
    title: "Vertical Garden",
    icon: "🧱",
    color: "#3A7050",
    accent: "#70B890",
    tag: "Space Multiplier",
    difficulty: "Intermediate",
    space: "6 sq ft of wall",
    sunlight: "Varies",
    water: "Drip required",
    invest: "₹2,000–₹40,000",
    description:
      "Convert any wall into a living herb tapestry. Space-efficient, visually stunning, and capable of extraordinary plant density.",
    bestFor: [
      "Zero floor space",
      "Feature walls",
      "High plant density",
      "Visual impact",
    ],
    tips: [
      {
        icon: "🏗️",
        title: "Structure Options",
        body: "Felt pocket panels (₹500–1,500, lightest), PVC towers, pallet planters, or modular cells. Start simple.",
      },
      {
        icon: "💧",
        title: "Automate Irrigation",
        body: "Drip timer running 2–3 cycles daily is non-negotiable. Hand-watering 50+ pockets is unsustainable.",
      },
      {
        icon: "⚖️",
        title: "Weight Assessment",
        body: "Fully saturated vertical gardens: 8–15 kg per sq ft. Use wall anchors rated for 3× expected weight.",
      },
      {
        icon: "🌿",
        title: "Shallow-Root Plants",
        body: "Mint, Brahmi, Gotu Kola, Thyme, Chamomile for pockets. Avoid deep-rooted Ashwagandha — outgrows pockets fast.",
      },
      {
        icon: "🎨",
        title: "Design as Art",
        body: "Mix leaf textures and colors: feathery Fennel, broad Basil, silver Artemisia, purple Lavender.",
      },
      {
        icon: "🔄",
        title: "Pocket Rotation",
        body: "Swap plants seasonally without redesigning. Keep replacement seedlings ready for seamless swaps.",
      },
    ],
    plants: [
      "Mint",
      "Brahmi",
      "Gotu Kola",
      "Thyme",
      "Chamomile",
      "Lemon Balm",
      "Basil",
      "Oregano",
      "Lavender",
      "Marigold",
      "Peppermint",
    ],
    seasonal: [
      {
        season: "🌱 Establishment",
        tip: "Best established in monsoon or early winter. New vertical gardens need intensive care for first 4 weeks.",
      },
      {
        season: "☀️ Summer",
        tip: "Add shade cloth. Increase drip to 4 cycles daily. Check middle and top pockets — they dry fastest.",
      },
      {
        season: "🌿 Maintenance",
        tip: "Trim aggressively every 3–4 weeks. Feed liquid fertilizer weekly through drip during peak growth.",
      },
    ],
  },
  {
    id: "container",
    title: "Container Garden",
    icon: "🪣",
    color: "#8A6030",
    accent: "#D0A060",
    tag: "Most Flexible",
    difficulty: "Beginner",
    space: "Any",
    sunlight: "Moveable",
    water: "Varies",
    invest: "₹200–₹5,000",
    description:
      "The most flexible approach — grow any plant anywhere and rearrange as needed. Perfect for renters and experimenters.",
    bestFor: [
      "Flexibility & mobility",
      "Renters",
      "Gradual expansion",
      "Experimenting",
    ],
    tips: [
      {
        icon: "📏",
        title: "Right Pot Size",
        body: 'Tulsi (8–10"), Mint (6–8"), Ginger/Turmeric (12–16" deep), Ashwagandha (16–20"). Under-potting is mistake #1.',
      },
      {
        icon: "🌊",
        title: "Drainage Always",
        body: "Never use a pot without drainage holes. Use decorative outer covers with holed nursery pots inside.",
      },
      {
        icon: "🧱",
        title: "Material Guide",
        body: "Terracotta: breathable, cooler roots. Plastic: lightweight, retains moisture. Fabric grow bags: best overall.",
      },
      {
        icon: "🌿",
        title: "Microclimate Grouping",
        body: "Group containers together for higher humidity. Cluster drought-tolerant plants separately from moisture-lovers.",
      },
      {
        icon: "⬆️",
        title: "Repotting Schedule",
        body: "Move up one size when roots emerge from drainage holes. Best timing: monsoon or early winter.",
      },
      {
        icon: "🍂",
        title: "Surface Mulching",
        body: "1 inch of dried grass or coco peat on pot soil. Reduces evaporation by 50%, prevents disease splash.",
      },
    ],
    plants: [
      "Tulsi (medium)",
      "Mint (small, isolated)",
      "Aloe Vera (medium)",
      "Ashwagandha (large)",
      "Ginger (deep)",
      "Lavender (terracotta)",
      "Chamomile (medium)",
    ],
    seasonal: [
      {
        season: "🌱 Spring",
        tip: "Repot before growing season. Refresh top 2 inches with compost. Divide overcrowded clumps.",
      },
      {
        season: "☀️ Summer",
        tip: "Move to morning-sun positions. Cluster tightly for humidity. Check small pots twice daily.",
      },
      {
        season: "❄️ Winter",
        tip: "Move tropicals indoors or against a warm wall. Reduce watering for dormant plants.",
      },
    ],
  },
  {
    id: "hydroponic",
    title: "Hydroponic",
    icon: "⚗️",
    color: "#1A6A7A",
    accent: "#40B8D0",
    tag: "Max Yield",
    difficulty: "Advanced",
    space: "Countertop+",
    sunlight: "LED required",
    water: "Automated pump",
    invest: "₹3,000–₹50,000",
    description:
      "Grow medicinal herbs in nutrient-rich water. 3–4× more biomass, 90% less water, virtually pest-free, season-independent.",
    bestFor: [
      "Maximum yield",
      "No pests or weeds",
      "Precise control",
      "Tech enthusiasts",
    ],
    tips: [
      {
        icon: "🧪",
        title: "Nutrient Solution",
        body: "N-P-K with micronutrients. Maintain EC 1.2–2.0 mS/cm for herbs. pH must stay 5.5–6.5 — check daily.",
      },
      {
        icon: "🏺",
        title: "System Selection",
        body: "Kratky (passive, no pump, beginner). NFT (thin film, great for herbs). DWC (fastest growth, advanced).",
      },
      {
        icon: "🌱",
        title: "Seed Starting",
        body: "Germinate in rockwool cubes or coco plugs. Transfer to system when roots emerge from bottom (10–14 days).",
      },
      {
        icon: "💨",
        title: "Root Oxygenation",
        body: "Run aquarium air pump continuously in DWC. White fuzzy roots = healthy. Brown slimy = root rot.",
      },
      {
        icon: "🌡️",
        title: "Water Temperature",
        body: "Keep solution at 18–22°C. Above 24°C reduces oxygen and invites pathogens. Use aquarium chiller.",
      },
      {
        icon: "📊",
        title: "Daily Monitoring",
        body: "Check pH and EC daily (30 seconds). Top up with plain water as nutrients absorb. Full change every 2 weeks.",
      },
    ],
    plants: [
      "Mint",
      "Basil",
      "Lemon Balm",
      "Peppermint",
      "Chamomile",
      "Brahmi",
      "Gotu Kola",
      "Stevia",
      "Thyme",
      "Oregano",
      "Lavender",
    ],
    seasonal: [
      {
        season: "🌿 All Year",
        tip: "Complete season independence. Harvest continuously with consistent 14-hour light cycles.",
      },
      {
        season: "🔧 Setup",
        tip: "Waterproof the area. Start with 4-site Kratky before scaling to NFT or DWC systems.",
      },
      {
        season: "📈 Optimize",
        tip: "Adjust nutrients for specific compounds. Higher potassium increases essential oil content in aromatics.",
      },
    ],
  },
];

const UNIVERSAL_TIPS = [
  {
    icon: "🌙",
    title: "Best Time to Water",
    body: "Early morning (6–8 AM) is ideal. For indoor plants, check soil moisture by inserting finger 1 inch deep before every watering.",
  },
  {
    icon: "🪱",
    title: "Vermicompost Tea",
    body: "Dilute vermicompost 1:10 with water, feed weekly. Delivers beneficial microbes, nutrients, and natural growth hormones.",
  },
  {
    icon: "🌿",
    title: "Neem Oil Spray",
    body: "2 tsp neem oil + 5 drops dish soap + 1 liter water. Spray on leaves (both sides) every 10 days — handles 90% of common pests.",
  },
  {
    icon: "✂️",
    title: "Pruning Principles",
    body: "Pinch flower buds from Tulsi and Basil to redirect energy to leaves. Regular 1/3 pruning keeps plants bushy for months longer.",
  },
  {
    icon: "🐝",
    title: "Attract Pollinators",
    body: "Allow some plants to flower — Tulsi, Brahmi, Coriander blooms attract bees and butterflies, improving overall garden yields.",
  },
  {
    icon: "🌕",
    title: "Lunar Planting",
    body: "Plant leafy herbs during waxing moon phases. Plant root herbs during waning phases. Many biodynamic growers report better germination.",
  },
  {
    icon: "🔄",
    title: "Crop Rotation",
    body: "Rotate plant families — never grow the same species in the same container two consecutive cycles to break pest and disease cycles.",
  },
  {
    icon: "📷",
    title: "Plant Journal",
    body: "Record planting dates, watering schedules, and weekly observations. A 3-month journal teaches more than any generic growing guide.",
  },
];

const PROBLEM_FIXES = [
  {
    problem: "Yellowing leaves",
    fix: "Usually overwatering. Let soil dry, check drainage holes are clear.",
  },
  {
    problem: "Leggy stretching stems",
    fix: "Insufficient light. Move to brighter spot or add grow light.",
  },
  {
    problem: "Wilting despite watering",
    fix: "Root rot. Check roots — brown and slimy means rot. Repot in fresh dry soil.",
  },
  {
    problem: "White powder on leaves",
    fix: "Powdery mildew. Spray neem oil + baking soda solution (1 tsp per liter).",
  },
  {
    problem: "Tiny flying insects",
    fix: "Fungus gnats. Let top 1 inch of soil dry between waterings. Add neem cake to surface.",
  },
  {
    problem: "Brown leaf edges",
    fix: "Salt buildup from fertilizer. Flush pot with 3× its volume of water. Reduce fertilizing.",
  },
  {
    problem: "No new growth",
    fix: "Root-bound. Check if roots circle the pot base. Repot one size up immediately.",
  },
  {
    problem: "Herb loses fragrance",
    fix: "Over-mature. Prune back by 50% to stimulate fresh, fragrant, potent new growth.",
  },
];

const STARTER_KITS = [
  {
    name: "Immunity Starter",
    price: "₹450",
    color: "#4A6741",
    emoji: "💪",
    plants: ["Tulsi", "Ginger", "Turmeric", "Amla"],
    use: "Daily immunity teas, golden milk, seasonal illness prevention",
    care: "Low maintenance — perfect for beginners",
  },
  {
    name: "Stress & Sleep",
    price: "₹620",
    color: "#5A3A8A",
    emoji: "😴",
    plants: ["Ashwagandha", "Brahmi", "Lavender", "Chamomile"],
    use: "Evening teas, sleep support, nervous system tonics",
    care: "Medium — well-drained soil essential",
  },
  {
    name: "Kitchen Medicine",
    price: "₹380",
    color: "#C8780A",
    emoji: "🍳",
    plants: ["Curry Leaf", "Coriander", "Fenugreek", "Mint"],
    use: "Daily cooking, digestive support, micronutrients",
    care: "Very low — first harvest in 30 days",
  },
  {
    name: "Skin & Beauty",
    price: "₹540",
    color: "#8A5030",
    emoji: "✨",
    plants: ["Aloe Vera", "Calendula", "Rose", "Neem"],
    use: "DIY face packs, wound healing, natural skincare",
    care: "Low — Aloe needs minimal water",
  },
  {
    name: "Respiratory Care",
    price: "₹490",
    color: "#1A6A7A",
    emoji: "🌬️",
    plants: ["Tulsi", "Lemongrass", "Peppermint", "Rosemary"],
    use: "Steam inhalations, decongestant teas, chest support",
    care: "Low — keep Mint in separate pot",
  },
  {
    name: "Women's Wellness",
    price: "₹680",
    color: "#C06080",
    emoji: "🌸",
    plants: ["Shatavari", "Brahmi", "Moringa", "Fenugreek"],
    use: "Hormonal balance, lactation support, iron supplementation",
    care: "Medium — Shatavari needs trellis",
  },
];

const SOIL_MIX = [
  {
    comp: "Garden Soil / Coco Peat",
    pct: "40%",
    color: "#8A6030",
    note: "Base structure",
  },
  {
    comp: "Vermicompost",
    pct: "30%",
    color: "#4A6741",
    note: "Slow-release nutrition",
  },
  { comp: "Coarse River Sand", pct: "15%", color: "#C8A860", note: "Drainage" },
  { comp: "Perlite / Pumice", pct: "10%", color: "#9A9A9A", note: "Aeration" },
  {
    comp: "Neem Cake Powder",
    pct: "5%",
    color: "#3A7050",
    note: "Pest prevention",
  },
];

const TIMELINE = [
  {
    era: "5000 BCE",
    event: "Ginseng first cultivated in Chinese highlands",
    plant: "Ginseng",
    icon: "📜",
  },
  {
    era: "4500 BCE",
    event: "Neem documented in pre-Indus Valley texts",
    plant: "Neem",
    icon: "🏺",
  },
  {
    era: "3000 BCE",
    event: "Ashwagandha recorded in the Charaka Samhita",
    plant: "Ashwagandha",
    icon: "📋",
  },
  {
    era: "2500 BCE",
    event: "Turmeric used in Vedic rituals and wound care",
    plant: "Turmeric",
    icon: "🏛️",
  },
  {
    era: "2200 BCE",
    event: "Aloe Vera recorded in the Egyptian Ebers Papyrus",
    plant: "Aloe Vera",
    icon: "📖",
  },
  {
    era: "1550 BCE",
    event: "Black seed found in Tutankhamun's burial tomb",
    plant: "Nigella",
    icon: "🕌",
  },
  {
    era: "400 BCE",
    event: "Hippocrates catalogs 400 medicinal herbs",
    plant: "Chamomile",
    icon: "⚗️",
  },
  {
    era: "659 CE",
    event: "Tang Materia Medica — first systematic TCM compendium",
    plant: "Ginseng",
    icon: "🌍",
  },
  {
    era: "1000 CE",
    event: "Ibn Sina's Canon of Medicine catalogs 800 plants",
    plant: "Licorice",
    icon: "📚",
  },
  {
    era: "1596 CE",
    event: "Li Shizhen documents 1,892 plant medicines",
    plant: "Ginseng",
    icon: "🏆",
  },
  {
    era: "1928 CE",
    event: "Fleming's penicillin validates nature as drug source",
    plant: "Garlic",
    icon: "🔬",
  },
  {
    era: "2024 CE",
    event: "AI-driven ethnobotany maps 50,000+ undocumented uses",
    plant: "Brahmi",
    icon: "🤖",
  },
];

const COMMUNITY = [
  {
    id: 1,
    title: "Herbal AI Diagnostics",
    region: "Karnataka",
    tags: ["AI", "Diagnosis"],
    summary:
      "AI model trained on 10,000 leaf scans to identify medicinal plants and suggest traditional uses.",
    impact: "12,000+ identifications in 3 months",
  },
  {
    id: 2,
    title: "Village Pharmacy Network",
    region: "Rajasthan",
    tags: ["Community", "Rural"],
    summary:
      "Trained health workers providing plant-based first aid in 200 villages without medical access.",
    impact: "150,000 people served",
  },
  {
    id: 3,
    title: "Nano-Curcumin Delivery",
    region: "Pune",
    tags: ["Research", "Pharma"],
    summary:
      "Lipid nanoparticle systems increasing curcumin bioavailability by 40× for oncology applications.",
    impact: "2 patents filed, Phase I pending",
  },
  {
    id: 4,
    title: "Moringa Water Kiosks",
    region: "Tamil Nadu",
    tags: ["Water", "Social"],
    summary:
      "Moringa seed extract in 50 community kiosks providing safe water without chemicals.",
    impact: "25,000 L/day purified",
  },
  {
    id: 5,
    title: "Sacred Grove Revival",
    region: "Kerala",
    tags: ["Conservation", "Biodiversity"],
    summary:
      "Restoring 120 sacred groves that historically preserved medicinal plant biodiversity.",
    impact: "800 species protected",
  },
  {
    id: 6,
    title: "School Garden Curriculum",
    region: "Maharashtra",
    tags: ["Education", "Youth"],
    summary:
      "Medicinal plant gardens in 500 school curricula with hands-on plant science modules.",
    impact: "200,000 students reached",
  },
];

const FORM_STEPS = [
  {
    label: "Founder",
    fields: [
      {
        name: "name",
        label: "Founder Name",
        type: "text",
        ph: "Your full name",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        ph: "founder@startup.com",
      },
      { name: "phone", label: "Phone", type: "tel", ph: "+91 98765 43210" },
    ],
  },
  {
    label: "Startup",
    fields: [
      {
        name: "startup",
        label: "Startup Name",
        type: "text",
        ph: "Viridyan Biotech Pvt. Ltd.",
      },
      {
        name: "focus",
        label: "Focus Plant / AYUSH System",
        type: "text",
        ph: "e.g., Ashwagandha — Ayurveda",
      },
      {
        name: "stage",
        label: "Stage",
        type: "select",
        opts: ["Idea Stage", "Prototype", "Early Revenue", "Scaling"],
      },
    ],
  },
  {
    label: "Impact",
    fields: [
      {
        name: "problem",
        label: "Problem Statement",
        type: "textarea",
        ph: "What healthcare challenge does your startup solve?",
      },
      {
        name: "sdg",
        label: "Aligned SDGs",
        type: "text",
        ph: "e.g., SDG 3, SDG 15",
      },
    ],
  },
  {
    label: "Support",
    fields: [
      {
        name: "funding",
        label: "Funding Required (₹)",
        type: "text",
        ph: "e.g., 50,00,000",
      },
      {
        name: "support",
        label: "Type of Support",
        type: "select",
        opts: [
          "Grant Funding",
          "Mentorship",
          "Market Access",
          "Regulatory Guidance",
          "All of the above",
        ],
      },
      {
        name: "notes",
        label: "Anything else?",
        type: "textarea",
        ph: "Tell us your vision…",
      },
    ],
  },
];

// ─── ADMIN ANALYTICS DATA ──────────────────────────────────────────────────
const DEMO = {
  kpis: [
    {
      label: "Total Users",
      value: "14,203",
      delta: "+18.4%",
      trend: "up",
      sparkline: [820, 940, 880, 1020, 1140, 1080, 1220, 1380, 1290, 1420],
      color: "#4A6741",
    },
    {
      label: "Active Today",
      value: "1,847",
      delta: "+12.1%",
      trend: "up",
      sparkline: [1100, 1280, 1190, 1340, 1420, 1380, 1500, 1620, 1580, 1847],
      color: "#3A6A8A",
    },
    {
      label: "Plants Viewed",
      value: "52,841",
      delta: "+24.7%",
      trend: "up",
      sparkline: [3200, 3800, 3500, 4100, 4400, 4200, 4700, 5100, 4900, 5284],
      color: "#C8780A",
    },
    {
      label: "Startups Registered",
      value: "312",
      delta: "+8.3%",
      trend: "up",
      sparkline: [22, 28, 24, 30, 32, 29, 34, 38, 36, 40],
      color: "#8A5030",
    },
  ],
  topPlants: [
    { name: "Ashwagandha", views: 4840, pct: 92 },
    { name: "Turmeric", views: 4210, pct: 80 },
    { name: "Holy Basil", views: 3980, pct: 75 },
    { name: "Brahmi", views: 3720, pct: 71 },
    { name: "Neem", views: 3480, pct: 66 },
    { name: "Moringa", views: 3150, pct: 60 },
    { name: "Aloe Vera", views: 2940, pct: 56 },
    { name: "Ginger", views: 2720, pct: 52 },
  ],
  pageViews: [
    { page: "Explore Garden", views: 28400, pct: 94 },
    { page: "Plant Detail", views: 22100, pct: 73 },
    { page: "Home", views: 18600, pct: 62 },
    { page: "Gardening Hub", views: 14200, pct: 47 },
    { page: "Community", views: 9800, pct: 32 },
    { page: "Startup Register", views: 6400, pct: 21 },
  ],
  monthlyUsers: [
    { month: "Sep", users: 7200 },
    { month: "Oct", users: 8400 },
    { month: "Nov", users: 9100 },
    { month: "Dec", users: 10800 },
    { month: "Jan", users: 12400 },
    { month: "Feb", users: 14203 },
  ],
  gardenMethods: [
    { method: "Terrace", sessions: 4820, pct: 88 },
    { method: "Balcony", sessions: 4210, pct: 77 },
    { method: "Kitchen", sessions: 3980, pct: 73 },
    { method: "Home", sessions: 3420, pct: 63 },
    { method: "Indoor", sessions: 2840, pct: 52 },
    { method: "Vertical", sessions: 1980, pct: 36 },
    { method: "Container", sessions: 1640, pct: 30 },
    { method: "Hydroponic", sessions: 920, pct: 17 },
  ],
  ayushBreakdown: [
    { system: "Ayurveda", count: 67, color: "#4A6741" },
    { system: "Naturopathy", count: 18, color: "#3A6A8A" },
    { system: "TCM", count: 10, color: "#C8780A" },
    { system: "Unani", count: 5, color: "#8A5030" },
  ],
  userSegments: [
    { segment: "Students", pct: 36, color: "#4A6741" },
    { segment: "Researchers", pct: 24, color: "#3A6A8A" },
    { segment: "Healthcare Workers", pct: 18, color: "#C8780A" },
    { segment: "Educators", pct: 13, color: "#8A5030" },
    { segment: "Entrepreneurs", pct: 9, color: "#5A3A8A" },
  ],
  trafficSources: [
    { source: "Direct", pct: 38, color: "#4A6741" },
    { source: "Organic Search", pct: 29, color: "#3A6A8A" },
    { source: "Social Media", pct: 19, color: "#C8780A" },
    { source: "Referral", pct: 14, color: "#8A5030" },
  ],
  recentActions: [
    {
      user: "U-7841",
      action: "Viewed Ashwagandha detail",
      type: "view",
      time: "2m ago",
    },
    {
      user: "U-3312",
      action: "Registered startup: HerbAI",
      type: "register",
      time: "5m ago",
    },
    {
      user: "U-9024",
      action: "Searched 'anti-diabetic plants'",
      type: "search",
      time: "8m ago",
    },
    {
      user: "U-1156",
      action: "Opened Terrace Garden guide",
      type: "garden",
      time: "11m ago",
    },
    {
      user: "U-4481",
      action: "Filtered by TCM system",
      type: "filter",
      time: "14m ago",
    },
    {
      user: "U-6620",
      action: "Viewed Brahmi detail",
      type: "view",
      time: "16m ago",
    },
    {
      user: "U-2209",
      action: "Registered startup: NatureCure",
      type: "register",
      time: "19m ago",
    },
    {
      user: "U-8834",
      action: "Searched 'adaptogens for stress'",
      type: "search",
      time: "22m ago",
    },
    {
      user: "U-5573",
      action: "Opened Indoor Garden guide",
      type: "garden",
      time: "25m ago",
    },
    {
      user: "U-7710",
      action: "Viewed Immunity Starter Kit",
      type: "view",
      time: "28m ago",
    },
  ],
  weeklyVisits: [
    { day: "Mon", visits: 1820 },
    { day: "Tue", visits: 2140 },
    { day: "Wed", visits: 1980 },
    { day: "Thu", visits: 2380 },
    { day: "Fri", visits: 2620 },
    { day: "Sat", visits: 2840 },
    { day: "Sun", visits: 3210 },
  ],
  conversionFunnel: [
    { stage: "Visitors", value: 14203 },
    { stage: "Plant Views", value: 9841 },
    { stage: "Garden Hub", value: 4820 },
    { stage: "Registered", value: 312 },
  ],
};

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --g:#4A6741;--gl:#7A9B71;--gp:#B8CDB4;--gx:#2E4828;
  --c:#F7F3EC;--cd:#EDE7D9;--cx:#E3DDD0;
  --e:#6B4F3A;--el:#9A7850;
  --gold:#C8A84B;--gold-l:#E8C878;
  --ink:#1C2419;--mist:#D4DDD1;--W:#FDFCFA;
  --r:12px;
  /* Admin */
  --a-bg:#0F1117;--a-s:#161B22;--a-b:#21262D;--a-t:#8B949E;--a-w:#C9D1D9;--a-ac:#4A6741;
}
html{scroll-behavior:smooth;}
body{font-family:'DM Sans',sans-serif;background:var(--c);color:var(--ink);line-height:1.6;overflow-x:hidden;}
::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:var(--cd);}::-webkit-scrollbar-thumb{background:var(--gl);border-radius:3px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes sway{0%,100%{transform:rotate(-5deg);}50%{transform:rotate(5deg)scale(1.05);}}
@keyframes marquee{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
@keyframes floatR{0%,100%{transform:translateY(0)rotate(5deg);}50%{transform:translateY(-12px)rotate(-4deg);}}
@keyframes orbit{0%{transform:rotate(0deg)translateX(30px)rotate(0deg);}100%{transform:rotate(360deg)translateX(30px)rotate(-360deg);}}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes pulse{0%,100%{opacity:.5;}50%{opacity:1;}}
@keyframes bar{from{width:0;}to{width:var(--w);}}
@keyframes countUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}

/* ── NAV ── */
.nav{position:fixed;top:0;left:0;right:0;z-index:200;background:rgba(247,243,236,.96);backdrop-filter:blur(20px);border-bottom:1px solid var(--mist);height:60px;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;}
.nav-logo{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:600;color:var(--g);cursor:pointer;display:flex;align-items:center;gap:.4rem;white-space:nowrap;}
.nav-links{display:flex;align-items:center;gap:.1rem;}
.nb{background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.68rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);padding:.36rem .62rem;border-radius:20px;transition:all .2s;opacity:.6;white-space:nowrap;}
.nb:hover{background:var(--gp);color:var(--g);opacity:1;}
.nb.active{background:var(--g);color:#fff;opacity:1;}
.ns{display:flex;align-items:center;gap:.38rem;background:var(--cd);border:1px solid var(--mist);border-radius:24px;padding:.32rem .85rem;transition:all .2s;}
.ns:focus-within{border-color:var(--gl);background:#fff;box-shadow:0 0 0 3px rgba(74,103,65,.1);}
.ns input{border:none;background:none;outline:none;font-family:'DM Sans',sans-serif;font-size:.76rem;color:var(--ink);width:130px;}
.ns input::placeholder{color:var(--gp);}
.page{min-height:100vh;padding-top:60px;}

/* ── BUTTONS ── */
.bp{background:var(--g);color:#fff;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.74rem;font-weight:500;letter-spacing:.07em;text-transform:uppercase;padding:.65rem 1.4rem;border-radius:28px;transition:all .2s;}
.bp:hover{background:var(--ink);transform:translateY(-1px);}
.bs{background:transparent;color:var(--g);border:1.5px solid var(--gp);cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.74rem;font-weight:500;letter-spacing:.07em;text-transform:uppercase;padding:.65rem 1.4rem;border-radius:28px;transition:all .2s;}
.bs:hover{background:var(--cd);border-color:var(--gl);}
.bg{background:var(--gold);color:var(--ink);border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.74rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;padding:.7rem 1.8rem;border-radius:28px;transition:all .2s;}
.bg:hover{background:var(--gold-l);}
.tag{background:var(--cd);border-radius:7px;padding:.12rem .45rem;font-size:.61rem;font-weight:500;}
.tag-row{display:flex;gap:.3rem;flex-wrap:wrap;}

/* ── HOME ── */
.home-hero{min-height:calc(100vh - 60px);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:2rem;text-align:center;}
.home-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 40%,rgba(120,165,110,.16),transparent 70%),radial-gradient(ellipse 40% 40% at 15% 85%,rgba(200,168,75,.1),transparent 60%);}
.leaf-d{position:absolute;opacity:.06;animation:sway 9s ease-in-out infinite;pointer-events:none;}
.h1{font-family:'Cormorant Garamond',serif;font-size:clamp(2.4rem,5.5vw,5.2rem);font-weight:300;line-height:1.05;color:var(--ink);margin-bottom:.35rem;animation:fadeUp .6s .1s ease both;}
.h1 em{font-style:italic;color:var(--g);}
.h-sub{font-family:'Cormorant Garamond',serif;font-size:clamp(.88rem,1.5vw,1.15rem);font-weight:300;color:var(--el);margin-bottom:1.5rem;max-width:430px;animation:fadeUp .6s .2s ease both;}
.marquee-w{width:100%;overflow:hidden;margin-bottom:1.6rem;animation:fadeUp .6s .4s ease both;}
.marquee-t{display:flex;gap:.7rem;animation:marquee 40s linear infinite;width:max-content;}
.marquee-t:hover{animation-play-state:paused;}
.mpill{display:flex;align-items:center;gap:.38rem;background:#fff;border:1px solid var(--mist);border-radius:22px;padding:.32rem .85rem;font-size:.75rem;white-space:nowrap;cursor:pointer;transition:all .18s;flex-shrink:0;}
.mpill:hover{border-color:var(--gl);transform:translateY(-2px);box-shadow:0 4px 12px rgba(74,103,65,.1);}
.hcards{display:grid;grid-template-columns:repeat(3,1fr);gap:.85rem;max-width:780px;width:100%;animation:fadeUp .6s .5s ease both;}
.hcard{background:#fff;border:1px solid var(--mist);border-radius:13px;padding:1.1rem 1.1rem 1.5rem;cursor:pointer;transition:all .22s;text-align:left;position:relative;overflow:hidden;}
.hcard::after{content:'→';position:absolute;bottom:.9rem;right:.9rem;font-size:.8rem;color:var(--gp);transition:all .2s;}
.hcard:hover::after{color:var(--g);transform:translateX(3px);}
.hcard:hover{border-color:var(--gl);box-shadow:0 10px 28px rgba(74,103,65,.1);transform:translateY(-3px);}
.home-stats{display:flex;gap:2rem;justify-content:center;padding:1.6rem 2rem;border-top:1px solid var(--mist);flex-wrap:wrap;}
.stat{text-align:center;cursor:pointer;transition:transform .2s;}
.stat:hover{transform:translateY(-3px);}
.stat-n{font-family:'Cormorant Garamond',serif;font-size:1.85rem;font-weight:600;color:var(--g);transition:color .2s;}
.stat-l{font-size:.63rem;color:var(--el);letter-spacing:.1em;text-transform:uppercase;margin-top:.1rem;}

/* ── SECTION HEADER ── */
.sh{padding:2.5rem 3rem 1.4rem;max-width:1200px;margin:0 auto;border-bottom:1px solid var(--mist);margin-bottom:1.8rem;}
.sh-eye{font-size:.61rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--gl);margin-bottom:.45rem;}
.sh-title{font-family:'Cormorant Garamond',serif;font-size:clamp(1.55rem,3.2vw,2.65rem);font-weight:300;color:var(--ink);line-height:1.1;}
.sh-title em{font-style:italic;color:var(--g);}
.sh-sub{font-size:.8rem;color:var(--el);max-width:460px;margin-top:.45rem;line-height:1.58;}

/* ── EXPLORE ── */
.filter-bar{display:flex;gap:.32rem;flex-wrap:wrap;padding:0 3rem;max-width:1200px;margin:0 auto 1.1rem;}
.fchip{background:var(--cd);border:1px solid var(--mist);border-radius:18px;padding:.26rem .75rem;font-size:.68rem;cursor:pointer;transition:all .18s;color:var(--ink);font-family:'DM Sans',sans-serif;}
.fchip:hover,.fchip.on{background:var(--g);color:#fff;border-color:var(--g);}
.plant-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:1rem;padding:0 3rem 4rem;max-width:1200px;margin:0 auto;}

/* ── PLANT DETAIL ── */
.pd-hero{height:400px;position:relative;overflow:hidden;display:flex;align-items:flex-end;}
.pd-hero-vignette{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 35%,rgba(28,36,25,.72) 100%);}
.pd-float{position:absolute;opacity:.12;animation:floatR 7s ease-in-out infinite;pointer-events:none;}
.pd-back{position:absolute;top:1rem;left:1.5rem;z-index:10;display:flex;align-items:center;gap:.45rem;background:rgba(255,255,255,.14);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.22);color:#fff;border-radius:22px;padding:.4rem .9rem;font-size:.7rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;}
.pd-back:hover{background:rgba(255,255,255,.26);}
.pd-ayush-badge{position:absolute;top:1rem;right:1.5rem;z-index:10;padding:.35rem .9rem;border-radius:18px;font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;backdrop-filter:blur(12px);}
.pd-emoji-stage{position:absolute;top:50%;left:50%;transform:translate(-50%,-60%);display:flex;align-items:center;justify-content:center;}
.pd-ring{position:relative;width:150px;height:150px;display:flex;align-items:center;justify-content:center;}
.pd-ring::before{content:'';position:absolute;inset:0;border-radius:50%;border:1px dashed rgba(255,255,255,.22);animation:spin 24s linear infinite;}
.pd-ring::after{content:'';position:absolute;inset:12px;border-radius:50%;border:1px solid rgba(255,255,255,.1);}
.pd-emoji-main{font-size:6rem;filter:drop-shadow(0 10px 36px rgba(0,0,0,.4));animation:float 5s ease-in-out infinite;position:relative;z-index:2;}
.pd-orb{position:absolute;width:7px;height:7px;border-radius:50%;top:50%;left:50%;margin:-3.5px;}
.pd-hero-info{position:relative;z-index:5;padding:1.8rem 3rem 1.6rem;width:100%;}
.pd-region-pill{display:inline-flex;align-items:center;gap:.38rem;background:rgba(255,255,255,.13);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.18);border-radius:18px;padding:.28rem .8rem;font-size:.66rem;font-weight:500;color:rgba(255,255,255,.88);margin-bottom:.7rem;}
.pd-name{font-family:'Cormorant Garamond',serif;font-size:clamp(2.6rem,5.5vw,4.6rem);font-weight:600;color:#fff;line-height:1;text-shadow:0 2px 18px rgba(0,0,0,.3);}
.pd-latin{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.05rem;color:rgba(255,255,255,.6);margin-top:.2rem;}
.pd-content{max-width:1080px;margin:0 auto;padding:0 3rem 6rem;}
.pd-stats-bar{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--mist);border-radius:14px;overflow:hidden;margin-bottom:2.2rem;box-shadow:0 4px 18px rgba(0,0,0,.05);}
.pd-stat{background:#fff;padding:1rem 1.2rem;transition:background .18s;}
.pd-stat:hover{background:var(--c);}
.pd-stat-lbl{font-size:.58rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--gl);margin-bottom:.22rem;}
.pd-stat-val{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:600;color:var(--ink);}
.pd-tags{display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1.8rem;}
.pd-tag{border-radius:18px;padding:.32rem .85rem;font-size:.72rem;font-weight:500;transition:all .18s;}
.pd-summary{border-radius:18px;padding:2rem 2.2rem;margin-bottom:1.4rem;position:relative;overflow:hidden;}
.pd-summary-bigq{position:absolute;top:-8px;left:10px;font-family:'Cormorant Garamond',serif;font-size:7rem;color:rgba(0,0,0,.04);line-height:1;pointer-events:none;}
.pd-summary-quote{font-family:'Cormorant Garamond',serif;font-size:clamp(1.1rem,2vw,1.45rem);font-weight:400;font-style:italic;line-height:1.55;color:var(--ink);position:relative;z-index:2;}
.pd-knowledge{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.8rem;}
.pd-k{border-radius:16px;overflow:hidden;transition:all .24s;cursor:default;}
.pd-k:hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(0,0,0,.08);}
.pd-k-head{padding:1.1rem 1.3rem .85rem;display:flex;align-items:center;gap:.6rem;}
.pd-k-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.pd-k-lbl{font-size:.6rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;}
.pd-k-ttl{font-family:'Cormorant Garamond',serif;font-size:1rem;font-weight:600;color:var(--ink);}
.pd-k-body{padding:0 1.3rem 1.3rem;font-family:'Cormorant Garamond',serif;font-size:.94rem;line-height:1.64;color:var(--ink);}
.pd-tl{display:flex;align-items:center;gap:0;overflow-x:auto;scrollbar-width:none;padding:.4rem 0 1.6rem;}
.pd-tl::-webkit-scrollbar{display:none;}
.pd-tl-node{display:flex;flex-direction:column;align-items:center;flex-shrink:0;}
.pd-tl-dot{width:11px;height:11px;border-radius:50%;border:2px solid;flex-shrink:0;}
.pd-tl-line{flex:1;height:1.5px;min-width:32px;}
.pd-tl-era{font-family:'Cormorant Garamond',serif;font-size:.76rem;font-weight:600;margin-top:.3rem;white-space:nowrap;}
.pd-tl-evt{font-size:.6rem;color:var(--el);white-space:nowrap;margin-top:.1rem;max-width:96px;text-align:center;line-height:1.3;}
.pd-grow{border-radius:16px;padding:1.8rem 2rem;display:flex;align-items:center;justify-content:space-between;gap:1.2rem;flex-wrap:wrap;margin-bottom:2rem;position:relative;overflow:hidden;}
.pd-grow::after{content:'🌱';position:absolute;right:1.5rem;bottom:-8px;font-size:7rem;opacity:.05;pointer-events:none;}
.pd-related{display:flex;gap:.7rem;overflow-x:auto;padding-bottom:.4rem;scrollbar-width:none;}
.pd-related::-webkit-scrollbar{display:none;}
.pd-rel-card{background:#fff;border:1px solid var(--mist);border-radius:13px;padding:.9rem 1.1rem;cursor:pointer;transition:all .2s;flex-shrink:0;min-width:140px;text-align:center;}
.pd-rel-card:hover{border-color:var(--gl);transform:translateY(-2px);}
.pd-rel-name{font-family:'Cormorant Garamond',serif;font-size:.92rem;font-weight:600;color:var(--ink);}
.pd-rel-tag{font-size:.6rem;color:var(--gl);margin-top:.12rem;}
.pd-sec-ttl{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;color:var(--ink);margin-bottom:1rem;display:flex;align-items:center;gap:.55rem;}
.pd-sec-line{flex:1;height:1px;background:var(--mist);}

/* ── GARDEN HUB ── */
.g-hero{min-height:44vh;background:var(--ink);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 2rem;text-align:center;position:relative;overflow:hidden;}
.g-hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 85% 65% at 50% 50%,rgba(74,103,65,.4),transparent 68%);}
.gf{position:absolute;opacity:.12;animation:float 6s ease-in-out infinite;}
.g-h1{font-family:'Cormorant Garamond',serif;font-size:clamp(1.9rem,4.5vw,3.8rem);font-weight:300;color:var(--c);line-height:1.08;position:relative;margin-bottom:.6rem;}
.g-h1 em{color:var(--gold-l);font-style:italic;}
.g-tab-bar{display:flex;gap:.45rem;padding:1.3rem 3rem 0;max-width:1200px;margin:0 auto;border-bottom:1px solid var(--mist);}
.g-tab{background:none;border:1.5px solid transparent;border-bottom:none;border-radius:9px 9px 0 0;padding:.5rem 1.2rem;font-size:.76rem;font-weight:500;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;color:var(--el);margin-bottom:-1px;}
.g-tab:hover{background:var(--cd);color:var(--g);}
.g-tab.active{background:#fff;border-color:var(--mist);color:var(--g);font-weight:600;}
.method-scroll{display:flex;gap:.45rem;padding:1.3rem 3rem .55rem;max-width:1200px;margin:0 auto;overflow-x:auto;scrollbar-width:none;}
.method-scroll::-webkit-scrollbar{display:none;}
.m-btn{display:flex;align-items:center;gap:.42rem;background:#fff;border:1.5px solid var(--mist);border-radius:26px;padding:.44rem 1rem;font-size:.73rem;font-weight:500;cursor:pointer;transition:all .2s;white-space:nowrap;font-family:'DM Sans',sans-serif;color:var(--ink);flex-shrink:0;}
.m-btn:hover{border-color:var(--gl);}
.m-btn.active{color:#fff;border-color:transparent;box-shadow:0 4px 14px rgba(0,0,0,.15);}
.m-wrap{max-width:1200px;margin:0 auto;padding:1.4rem 3rem 5rem;}
.m-banner{border-radius:20px;padding:2.5rem 2.2rem;margin-bottom:1.8rem;display:flex;align-items:center;justify-content:space-between;gap:1.8rem;flex-wrap:wrap;position:relative;overflow:hidden;}
.m-banner-mesh{position:absolute;inset:0;background:repeating-linear-gradient(45deg,rgba(255,255,255,.022) 0,rgba(255,255,255,.022) 1px,transparent 1px,transparent 28px);}
.m-badge{background:rgba(0,0,0,.22);border:1px solid rgba(255,255,255,.32);border-radius:18px;padding:.26rem .8rem;font-size:.68rem;font-weight:600;color:#fff;letter-spacing:.02em;}
.m-title{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,3.8vw,3rem);font-weight:600;color:#fff;line-height:1.05;margin-bottom:.3rem;text-shadow:0 2px 14px rgba(0,0,0,.3);}
.m-emoji{font-size:5rem;animation:float 4s ease-in-out infinite;filter:drop-shadow(0 6px 20px rgba(0,0,0,.25));}
.specs{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:.75rem;margin-bottom:1.8rem;}
.spec{background:#fff;border:1px solid var(--mist);border-radius:11px;padding:.85rem .95rem;}
.spec-lbl{font-size:.58rem;font-weight:500;letter-spacing:.13em;text-transform:uppercase;color:var(--gl);margin-bottom:.24rem;}
.spec-val{font-family:'Cormorant Garamond',serif;font-size:.96rem;color:var(--ink);font-weight:600;line-height:1.2;}
.tips-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(282px,1fr));gap:.95rem;margin-bottom:2rem;}
.tip-card{background:#fff;border:1px solid var(--mist);border-radius:13px;padding:1.25rem;transition:all .2s;position:relative;overflow:hidden;}
.tip-card:hover{border-color:var(--gl);box-shadow:0 7px 22px rgba(74,103,65,.09);transform:translateY(-2px);}
.tip-accent{position:absolute;top:0;left:0;right:0;height:2.5px;border-radius:13px 13px 0 0;}
.plants-box{background:#fff;border:1px solid var(--mist);border-radius:14px;padding:1.4rem;margin-bottom:1.8rem;}
.ppill{background:var(--cd);border:1px solid var(--mist);border-radius:18px;padding:.28rem .8rem;font-size:.73rem;color:var(--ink);cursor:pointer;transition:all .16s;display:inline-flex;align-items:center;gap:.28rem;}
.ppill:hover{background:var(--g);color:#fff;border-color:var(--g);}
.seasonal{display:grid;grid-template-columns:repeat(3,1fr);gap:.8rem;margin-bottom:1.8rem;}
.season-card{background:#fff;border:1px solid var(--mist);border-radius:12px;padding:1rem;border-top-width:2.5px;}
.utips{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:.95rem;padding:1.4rem 3rem 2rem;max-width:1200px;margin:0 auto;}
.utip{background:#fff;border:1px solid var(--mist);border-radius:13px;padding:1.3rem;transition:all .2s;}
.utip:hover{border-color:var(--gl);box-shadow:0 7px 20px rgba(74,103,65,.08);transform:translateY(-2px);}
.kits-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(272px,1fr));gap:1rem;}
.kit{border-radius:15px;padding:1.4rem;position:relative;overflow:hidden;transition:all .22s;}
.kit:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.1);}
.soil-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:.8rem;}

/* ── TIMELINE ── */
.tl-wrap{max-width:680px;margin:0 auto;padding:0 2rem 5rem;position:relative;}
.tl-line{position:absolute;left:50%;top:0;bottom:0;width:1px;background:var(--mist);transform:translateX(-50%);}
.tl-item{display:grid;grid-template-columns:1fr 46px 1fr;align-items:center;gap:.75rem;margin-bottom:1.3rem;animation:fadeUp .35s ease both;}
.tl-dot{width:36px;height:36px;background:#fff;border:2px solid var(--gp);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.9rem;margin:0 auto;transition:all .2s;}
.tl-item:hover .tl-dot{background:var(--g);border-color:var(--g);transform:scale(1.14);}

/* ── FORM ── */
.fw{max-width:580px;margin:0 auto;padding:0 2rem 5rem;}
.fp{display:flex;margin-bottom:1.8rem;background:var(--cd);border-radius:30px;overflow:hidden;border:1px solid var(--mist);}
.fstep{flex:1;padding:.55rem;text-align:center;font-size:.63rem;font-weight:500;letter-spacing:.07em;text-transform:uppercase;color:var(--el);transition:all .28s;cursor:pointer;}
.fstep.done{background:var(--gp);color:var(--g);}
.fstep.cur{background:var(--g);color:#fff;}
.fc{background:#fff;border:1px solid var(--mist);border-radius:15px;padding:1.8rem;}
.ff{margin-bottom:1rem;}
.fl{display:block;font-size:.65rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--g);margin-bottom:.33rem;}
.fi,.fta,.fse{width:100%;padding:.68rem .85rem;background:var(--c);border:1.5px solid var(--mist);border-radius:8px;font-family:'DM Sans',sans-serif;font-size:.82rem;color:var(--ink);outline:none;transition:all .18s;-webkit-appearance:none;}
.fi:focus,.fta:focus,.fse:focus{border-color:var(--gl);background:#fff;box-shadow:0 0 0 3px rgba(74,103,65,.07);}
.fta{min-height:75px;resize:vertical;}
.fnav{display:flex;justify-content:space-between;align-items:center;margin-top:1.3rem;}

/* ── COMMUNITY ── */
.cc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(288px,1fr));gap:1rem;padding:0 3rem 5rem;max-width:1200px;margin:0 auto;}
.cc-card{background:#fff;border:1px solid var(--mist);border-radius:14px;padding:1.3rem;cursor:pointer;transition:all .2s;}
.cc-card:hover{border-color:var(--gl);box-shadow:0 9px 26px rgba(74,103,65,.09);transform:translateY(-2px);}

/* ── FUTURE ── */
.fut-hero{min-height:38vh;background:var(--ink);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 2rem;text-align:center;position:relative;overflow:hidden;}
.fut-bg{position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 50%,rgba(74,103,65,.35),transparent 70%);}
.met-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.95rem;padding:2rem 3rem 0;max-width:1080px;margin:0 auto;}
.met{background:#fff;border:1px solid var(--mist);border-radius:11px;padding:1.3rem 1rem;text-align:center;transition:all .2s;}
.met:hover{border-color:var(--gl);transform:translateY(-2px);}

/* ═══════════════════════════════════════════════════
   ADMIN DASHBOARD — dark minimal
═══════════════════════════════════════════════════ */
.adm{min-height:100vh;background:var(--a-bg);padding-top:60px;font-family:'DM Sans',sans-serif;}
.adm-nav{position:fixed;top:0;left:0;right:0;z-index:201;height:60px;background:rgba(15,17,23,.96);backdrop-filter:blur(20px);border-bottom:1px solid var(--a-b);display:flex;align-items:center;padding:0 1.5rem;justify-content:space-between;}
.adm-logo{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:600;color:var(--a-w);display:flex;align-items:center;gap:.5rem;}
.adm-logo span{font-size:.65rem;font-family:'JetBrains Mono',monospace;background:var(--a-ac);color:#fff;padding:.18rem .5rem;border-radius:5px;letter-spacing:.06em;font-style:normal;}
.adm-tabs{display:flex;gap:.2rem;}
.adm-tab{background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.7rem;font-weight:500;color:var(--a-t);padding:.38rem .75rem;border-radius:8px;transition:all .18s;letter-spacing:.04em;}
.adm-tab:hover{background:var(--a-b);color:var(--a-w);}
.adm-tab.on{background:var(--a-b);color:var(--a-w);}
.adm-exit{background:none;border:1px solid var(--a-b);cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.68rem;color:var(--a-t);padding:.36rem .85rem;border-radius:8px;transition:all .18s;letter-spacing:.04em;}
.adm-exit:hover{border-color:var(--a-t);color:var(--a-w);}
.adm-body{padding:1.8rem 2rem 4rem;max-width:1320px;margin:0 auto;}
.adm-row{display:grid;gap:1rem;margin-bottom:1rem;}
.adm-row-4{grid-template-columns:repeat(4,1fr);}
.adm-row-3{grid-template-columns:repeat(3,1fr);}
.adm-row-2{grid-template-columns:repeat(2,1fr);}
.adm-row-21{grid-template-columns:2fr 1fr;}
.adm-row-12{grid-template-columns:1fr 2fr;}
.adm-section-title{font-size:.63rem;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--a-t);margin-bottom:1rem;display:flex;align-items:center;gap:.5rem;}
.adm-section-title::after{content:'';flex:1;height:1px;background:var(--a-b);}

/* KPI card */
.kpi{background:var(--a-s);border:1px solid var(--a-b);border-radius:12px;padding:1.3rem 1.4rem;transition:border-color .2s;animation:countUp .4s ease both;}
.kpi:hover{border-color:#30363D;}
.kpi-lbl{font-size:.63rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--a-t);margin-bottom:.5rem;}
.kpi-val{font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:600;color:var(--a-w);line-height:1;margin-bottom:.4rem;}
.kpi-delta{font-size:.72rem;font-weight:500;display:flex;align-items:center;gap:.3rem;}
.kpi-spark{display:flex;align-items:flex-end;gap:2px;height:32px;margin-top:.7rem;}
.kpi-spark-bar{flex:1;border-radius:2px 2px 0 0;transition:all .2s;min-width:6px;}

/* Panel */
.panel{background:var(--a-s);border:1px solid var(--a-b);border-radius:12px;padding:1.3rem 1.4rem;transition:border-color .2s;}
.panel:hover{border-color:#30363D;}
.panel-title{font-size:.72rem;font-weight:600;color:var(--a-w);margin-bottom:1.1rem;display:flex;align-items:center;justify-content:space-between;}
.panel-sub{font-size:.62rem;color:var(--a-t);font-weight:400;}

/* Bar chart row */
.bar-row{display:flex;align-items:center;gap:.7rem;margin-bottom:.72rem;}
.bar-lbl{font-size:.7rem;color:var(--a-t);width:110px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.bar-track{flex:1;height:6px;background:var(--a-b);border-radius:3px;overflow:hidden;}
.bar-fill{height:100%;border-radius:3px;transition:width .6s ease;}
.bar-val{font-size:.66rem;font-family:'JetBrains Mono',monospace;color:var(--a-t);width:52px;text-align:right;flex-shrink:0;}

/* Area chart */
.area-chart{width:100%;overflow:hidden;}

/* Donut segment labels */
.donut-wrap{display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;}
.donut-legend{display:flex;flex-direction:column;gap:.5rem;flex:1;}
.donut-leg-row{display:flex;align-items:center;gap:.5rem;}
.donut-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.donut-leg-lbl{font-size:.68rem;color:var(--a-t);flex:1;}
.donut-leg-val{font-size:.68rem;font-family:'JetBrains Mono',monospace;color:var(--a-w);}

/* Activity feed */
.feed-row{display:flex;align-items:center;gap:.7rem;padding:.6rem 0;border-bottom:1px solid var(--a-b);}
.feed-row:last-child{border-bottom:none;}
.feed-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.feed-user{font-size:.65rem;font-family:'JetBrains Mono',monospace;color:var(--a-t);width:55px;flex-shrink:0;}
.feed-action{font-size:.71rem;color:var(--a-w);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.feed-time{font-size:.62rem;color:var(--a-t);flex-shrink:0;}

/* Funnel */
.funnel-row{margin-bottom:.7rem;}
.funnel-lbl{display:flex;justify-content:space-between;margin-bottom:.28rem;}
.funnel-stage{font-size:.7rem;color:var(--a-t);}
.funnel-val{font-size:.7rem;font-family:'JetBrains Mono',monospace;color:var(--a-w);}
.funnel-bar{height:28px;border-radius:6px;display:flex;align-items:center;padding:0 .75rem;transition:width .6s ease;}
.funnel-bar-val{font-size:.65rem;color:rgba(255,255,255,.7);font-weight:500;}

/* Status dot */
.live-dot{width:6px;height:6px;border-radius:50%;background:#3FB950;animation:pulse 2s ease-in-out infinite;display:inline-block;margin-right:.3rem;}

/* Weekly bar chart */
.wk-chart{display:flex;align-items:flex-end;gap:6px;height:80px;margin-top:.5rem;}
.wk-bar-wrap{flex:1;display:flex;flex-direction:column;align-items:center;gap:.3rem;}
.wk-bar{width:100%;border-radius:4px 4px 0 0;transition:all .2s;cursor:default;}
.wk-bar:hover{opacity:.8;}
.wk-lbl{font-size:.58rem;color:var(--a-t);font-family:'JetBrains Mono',monospace;}

/* Responsive */
@media(max-width:1100px){.adm-row-4{grid-template-columns:repeat(2,1fr);}.adm-row-3{grid-template-columns:repeat(2,1fr);}.adm-row-21,.adm-row-12{grid-template-columns:1fr;}}
@media(max-width:960px){.hcards{grid-template-columns:1fr 1fr;}.met-grid{grid-template-columns:1fr 1fr;}.seasonal{grid-template-columns:1fr;}.pd-knowledge{grid-template-columns:1fr;}.pd-stats-bar{grid-template-columns:1fr 1fr;}.pd-content{padding:0 1.2rem 4rem;}.pd-hero-info{padding:1.6rem 1.2rem;}.sh{padding:2rem 1.5rem 1.2rem;}}
@media(max-width:640px){.hcards{grid-template-columns:1fr;}.nav-links{display:none;}.plant-grid,.cc-grid{padding:0 1rem 3rem;}.sh,.m-wrap{padding-left:1rem;padding-right:1rem;}.filter-bar,.method-scroll,.utips,.kits-wrap{padding-left:1rem;padding-right:1rem;}.tips-grid{grid-template-columns:1fr;}.m-banner{flex-direction:column;}.specs{grid-template-columns:1fr 1fr;}.adm-row-2{grid-template-columns:1fr;}.adm-tabs{display:none;}}
`;

// Mini sparkline
function Spark({ data, color }) {
  const max = Math.max(...data);
  return (
    <div className="kpi-spark">
      {data.map((v, i) => (
        <div
          key={i}
          className="kpi-spark-bar"
          style={{
            height: `\${(v / max) * 100}%`,
            background: i === data.length - 1 ? color : color + "55",
          }}
        />
      ))}
    </div>
  );
}

// SVG area chart
function AreaChart({ data, color }) {
  const W = 540,
    H = 80,
    pad = 4;
  const vals = data.map((d) => d.users);
  const labels = data.map((d) => d.month);
  const max = Math.max(...vals);
  const min = Math.min(...vals) * 0.92;
  const xs = vals.map((_, i) => pad + (i / (vals.length - 1)) * (W - pad * 2));
  const ys = vals.map(
    (v) => H - pad - ((v - min) / (max - min)) * (H - pad * 2)
  );
  const line = xs
    .map((x, i) => `\${i === 0 ? 'M' : 'L'}\${x},\${ys[i]}`)
    .join(" ");
  const area = `\${line} L\${xs[xs.length - 1]},\${H} L\${xs[0]},\${H} Z`;
  return (
    <div className="area-chart">
      <svg
        viewBox={`0 0 \${W} \${H}`}
        style={{ width: "100%", height: 80, overflow: "visible" }}
      >
        <defs>
          <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity=".3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#ag)" />
        <path
          d={line}
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {xs.map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={ys[i]}
            r="2.5"
            fill={i === vals.length - 1 ? color : "transparent"}
            stroke={color}
            strokeWidth="1.5"
          />
        ))}
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: ".2rem",
        }}
      >
        {labels.map((l, i) => (
          <span
            key={i}
            style={{
              fontSize: ".58rem",
              color: "var(--a-t)",
              fontFamily: "JetBrains Mono,monospace",
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// Donut SVG
function Donut({ data, size = 110 }) {
  const r = 38,
    cx = size / 2,
    cy = size / 2;
  const circ = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.count, 0);
  let offset = 0;
  const segs = data.map((d) => {
    const pct = d.count / total;
    const dash = pct * circ;
    const seg = { ...d, dash, offset, pct };
    offset += dash;
    return seg;
  });
  return (
    <svg
      viewBox={`0 0 \${size} \${size}`}
      style={{ width: size, height: size, flexShrink: 0 }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--a-b)"
        strokeWidth="14"
      />
      {segs.map((s, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={s.color}
          strokeWidth="14"
          strokeDasharray={`\${s.dash} \${circ - s.dash}`}
          strokeDashoffset={-s.offset + circ / 4}
          style={{ transition: "all .6s ease" }}
        />
      ))}
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        fill="var(--a-w)"
        fontSize="11"
        fontFamily="Cormorant Garamond,serif"
        fontWeight="600"
      >
        {total}
      </text>
      <text
        x={cx}
        y={cy + 15}
        textAnchor="middle"
        fill="var(--a-t)"
        fontSize="7"
        fontFamily="DM Sans,sans-serif"
      >
        plants
      </text>
    </svg>
  );
}

function AdminDashboard({ onExit }) {
  const [tab, setTab] = useState("overview");
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 3000);
    return () => clearInterval(t);
  }, []);

  const feedColors = {
    view: "#4A6741",
    register: "#C8780A",
    search: "#3A6A8A",
    garden: "#5A3A8A",
    filter: "#8A5030",
  };

  return (
    <div className="adm">
      {/* Admin Nav */}
      <nav className="adm-nav">
        <div className="adm-logo">
          🌿 Viridyan <span>ADMIN</span>
        </div>
        <div className="adm-tabs">
          {[
            ["overview", "Overview"],
            ["plants", "Plants"],
            ["garden", "Garden"],
            ["users", "Users"],
            ["activity", "Activity"],
          ].map(([k, l]) => (
            <button
              key={k}
              className={`adm-tab \${tab === k ? 'on' : ''}`}
              onClick={() => setTab(k)}
            >
              {l}
            </button>
          ))}
        </div>
        <button className="adm-exit" onClick={onExit}>
          ← Exit Admin
        </button>
      </nav>

      <div className="adm-body">
        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.4rem",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: ".62rem",
                    fontFamily: "JetBrains Mono,monospace",
                    color: "var(--a-t)",
                    marginBottom: ".3rem",
                  }}
                >
                  <span className="live-dot" />
                  LIVE · Updated {new Date().toLocaleTimeString()}
                </div>
                <div
                  style={{
                    fontFamily: "Cormorant Garamond,serif",
                    fontSize: "1.7rem",
                    fontWeight: 600,
                    color: "var(--a-w)",
                  }}
                >
                  Platform Overview
                </div>
              </div>
              <div style={{ display: "flex", gap: ".5rem" }}>
                {["7D", "30D", "90D", "All"].map((r, i) => (
                  <button
                    key={r}
                    style={{
                      background: i === 1 ? "var(--a-ac)" : "none",
                      border: `1px solid \${i === 1 ? 'var(--a-ac)' : 'var(--a-b)'}`,
                      color: i === 1 ? "#fff" : "var(--a-t)",
                      borderRadius: 7,
                      padding: ".28rem .65rem",
                      fontSize: ".66rem",
                      cursor: "pointer",
                      fontFamily: "DM Sans,sans-serif",
                      transition: "all .18s",
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div className="adm-row adm-row-4" style={{ marginBottom: "1rem" }}>
              {DEMO.kpis.map((k, i) => (
                <div
                  key={i}
                  className="kpi"
                  style={{ animationDelay: `\${i * .08}s` }}
                >
                  <div className="kpi-lbl">{k.label}</div>
                  <div className="kpi-val">{k.value}</div>
                  <div className="kpi-delta" style={{ color: "#3FB950" }}>
                    <span>▲</span>
                    {k.delta}{" "}
                    <span style={{ color: "var(--a-t)", fontWeight: 400 }}>
                      vs last period
                    </span>
                  </div>
                  <Spark data={k.sparkline} color={k.color} />
                </div>
              ))}
            </div>

            {/* Monthly users chart + traffic sources */}
            <div className="adm-row adm-row-21">
              <div className="panel">
                <div className="panel-title">
                  Monthly Active Users
                  <span className="panel-sub">6-month trend</span>
                </div>
                <AreaChart data={DEMO.monthlyUsers} color="var(--a-ac)" />
              </div>
              <div className="panel">
                <div className="panel-title">Traffic Sources</div>
                <div className="donut-wrap">
                  <Donut
                    data={DEMO.trafficSources.map((s) => ({
                      ...s,
                      count: s.pct,
                    }))}
                    size={100}
                  />
                  <div className="donut-legend">
                    {DEMO.trafficSources.map((s, i) => (
                      <div key={i} className="donut-leg-row">
                        <div
                          className="donut-dot"
                          style={{ background: s.color }}
                        />
                        <span className="donut-leg-lbl">{s.source}</span>
                        <span className="donut-leg-val">{s.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly visits + conversion funnel */}
            <div className="adm-row adm-row-2" style={{ marginTop: "1rem" }}>
              <div className="panel">
                <div className="panel-title">
                  Weekly Visit Pattern
                  <span className="panel-sub">visits per day</span>
                </div>
                <div className="wk-chart">
                  {DEMO.weeklyVisits.map((d, i) => {
                    const max = Math.max(
                      ...DEMO.weeklyVisits.map((x) => x.visits)
                    );
                    const h = (d.visits / max) * 100;
                    return (
                      <div key={i} className="wk-bar-wrap">
                        <div
                          className="wk-bar"
                          style={{
                            height: h + "%",
                            background: i === 6 ? "var(--a-ac)" : "var(--a-b)",
                            opacity: 0.85 + i * 0.02,
                          }}
                        />
                        <span className="wk-lbl">{d.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="panel">
                <div className="panel-title">Conversion Funnel</div>
                {DEMO.conversionFunnel.map((f, i) => {
                  const maxV = DEMO.conversionFunnel[0].value;
                  const pct = (f.value / maxV) * 100;
                  const colors = [
                    "var(--a-ac)",
                    "#3A6A8A",
                    "#C8780A",
                    "#8A5030",
                  ];
                  return (
                    <div key={i} className="funnel-row">
                      <div className="funnel-lbl">
                        <span className="funnel-stage">{f.stage}</span>
                        <span className="funnel-val">
                          {f.value.toLocaleString()}
                        </span>
                      </div>
                      <div
                        style={{
                          height: 26,
                          background: "var(--a-b)",
                          borderRadius: 6,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: pct + "%",
                            background: colors[i],
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: ".6rem",
                            transition: "width .7s ease",
                          }}
                        >
                          <span
                            style={{
                              fontSize: ".62rem",
                              color: "rgba(255,255,255,.75)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {pct.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ── PLANTS TAB ── */}
        {tab === "plants" && (
          <>
            <div
              style={{
                fontFamily: "Cormorant Garamond,serif",
                fontSize: "1.7rem",
                fontWeight: 600,
                color: "var(--a-w)",
                marginBottom: "1.4rem",
              }}
            >
              Plant Analytics
            </div>
            <div className="adm-row adm-row-2">
              <div className="panel">
                <div className="panel-title">
                  Top Plants by Views{" "}
                  <span className="panel-sub">all time</span>
                </div>
                {DEMO.topPlants.map((p, i) => (
                  <div key={i} className="bar-row">
                    <div
                      className="bar-lbl"
                      style={{
                        color: "var(--a-w)",
                        fontWeight: i < 3 ? 600 : 400,
                      }}
                    >
                      {i < 3 && (
                        <span
                          style={{
                            color: "var(--gold-l)",
                            marginRight: ".3rem",
                            fontSize: ".6rem",
                          }}
                        >
                          {"★".repeat(3 - i)}
                        </span>
                      )}
                      {p.name}
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: p.pct + "%",
                          background: "var(--a-ac)",
                        }}
                      />
                    </div>
                    <div className="bar-val">{p.views.toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="panel">
                <div className="panel-title">AYUSH System Distribution</div>
                <div className="donut-wrap" style={{ marginBottom: "1.2rem" }}>
                  <Donut data={DEMO.ayushBreakdown} size={110} />
                  <div className="donut-legend">
                    {DEMO.ayushBreakdown.map((s, i) => (
                      <div key={i} className="donut-leg-row">
                        <div
                          className="donut-dot"
                          style={{ background: s.color }}
                        />
                        <span className="donut-leg-lbl">{s.system}</span>
                        <span className="donut-leg-val">{s.count} plants</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    borderTop: "1px solid var(--a-b)",
                    paddingTop: "1rem",
                  }}
                >
                  <div className="adm-section-title">Page Performance</div>
                  {DEMO.pageViews.map((p, i) => (
                    <div key={i} className="bar-row">
                      <div className="bar-lbl">{p.page}</div>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{ width: p.pct + "%", background: "#3A6A8A" }}
                        />
                      </div>
                      <div className="bar-val">{p.views.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Plant catalog table */}
            <div className="panel" style={{ marginTop: "1rem" }}>
              <div className="panel-title">
                All Plants Catalog{" "}
                <span className="panel-sub">{PLANTS.length} total</span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: ".71rem",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--a-b)" }}>
                      {[
                        "#",
                        "Name",
                        "Latin Name",
                        "AYUSH",
                        "Region",
                        "Era",
                        "Tags",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: ".5rem .7rem",
                            textAlign: "left",
                            color: "var(--a-t)",
                            fontWeight: 500,
                            letterSpacing: ".1em",
                            fontSize: ".62rem",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PLANTS.slice(0, 20).map((p, i) => (
                      <tr
                        key={p.id}
                        style={{
                          borderBottom: "1px solid var(--a-b)",
                          transition: "background .15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "var(--a-b)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <td
                          style={{
                            padding: ".48rem .7rem",
                            color: "var(--a-t)",
                            fontFamily: "JetBrains Mono,monospace",
                          }}
                        >
                          {String(p.id).padStart(3, "0")}
                        </td>
                        <td
                          style={{
                            padding: ".48rem .7rem",
                            color: "var(--a-w)",
                            fontWeight: 500,
                          }}
                        >
                          <span style={{ marginRight: ".4rem" }}>
                            {p.emoji}
                          </span>
                          {p.name}
                        </td>
                        <td
                          style={{
                            padding: ".48rem .7rem",
                            color: "var(--a-t)",
                            fontStyle: "italic",
                          }}
                        >
                          {p.latin}
                        </td>
                        <td style={{ padding: ".48rem .7rem" }}>
                          <span
                            style={{
                              background: "var(--a-ac)22",
                              color: "var(--a-ac)",
                              border: "1px solid var(--a-ac)44",
                              borderRadius: 5,
                              padding: ".1rem .4rem",
                              fontSize: ".6rem",
                              fontWeight: 500,
                            }}
                          >
                            {p.ayush || "—"}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: ".48rem .7rem",
                            color: "var(--a-t)",
                          }}
                        >
                          {p.region}
                        </td>
                        <td
                          style={{
                            padding: ".48rem .7rem",
                            color: "var(--a-t)",
                            fontFamily: "JetBrains Mono,monospace",
                            fontSize: ".65rem",
                          }}
                        >
                          {p.era}
                        </td>
                        <td style={{ padding: ".48rem .7rem" }}>
                          <div
                            style={{
                              display: "flex",
                              gap: ".25rem",
                              flexWrap: "wrap",
                            }}
                          >
                            {p.tags.slice(0, 2).map((t, j) => (
                              <span
                                key={j}
                                style={{
                                  background: "var(--a-b)",
                                  color: "var(--a-t)",
                                  borderRadius: 4,
                                  padding: ".08rem .38rem",
                                  fontSize: ".6rem",
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div
                  style={{
                    padding: ".75rem .7rem",
                    color: "var(--a-t)",
                    fontSize: ".66rem",
                    borderTop: "1px solid var(--a-b)",
                  }}
                >
                  Showing 20 of {PLANTS.length} plants ·{" "}
                  <span style={{ color: "var(--a-ac)", cursor: "pointer" }}>
                    View all →
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── GARDEN TAB ── */}
        {tab === "garden" && (
          <>
            <div
              style={{
                fontFamily: "Cormorant Garamond,serif",
                fontSize: "1.7rem",
                fontWeight: 600,
                color: "var(--a-w)",
                marginBottom: "1.4rem",
              }}
            >
              Garden Hub Analytics
            </div>
            <div className="adm-row adm-row-2">
              <div className="panel">
                <div className="panel-title">
                  Garden Method Engagement{" "}
                  <span className="panel-sub">sessions</span>
                </div>
                {DEMO.gardenMethods.map((m, i) => (
                  <div key={i} className="bar-row">
                    <div className="bar-lbl" style={{ color: "var(--a-w)" }}>
                      {m.method}
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: m.pct + "%",
                          background: "var(--a-ac)",
                        }}
                      />
                    </div>
                    <div className="bar-val">{m.sessions.toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="panel">
                <div className="panel-title">Starter Kit Interest</div>
                {STARTER_KITS.map((k, i) => {
                  const vals = [82, 71, 68, 55, 49, 38];
                  return (
                    <div key={i} className="bar-row">
                      <div className="bar-lbl" style={{ color: "var(--a-w)" }}>
                        {k.emoji} {k.name}
                      </div>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{ width: vals[i] + "%", background: k.color }}
                        />
                      </div>
                      <div className="bar-val">{vals[i]}%</div>
                    </div>
                  );
                })}
                <div
                  style={{
                    borderTop: "1px solid var(--a-b)",
                    paddingTop: ".8rem",
                    marginTop: ".5rem",
                    fontSize: ".67rem",
                    color: "var(--a-t)",
                  }}
                >
                  Based on kit page time & CTA clicks
                </div>
              </div>
            </div>
            {/* Garden method detail */}
            <div className="panel" style={{ marginTop: "1rem" }}>
              <div className="panel-title">Garden Method Deep Dive</div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr)",
                  gap: "1rem",
                }}
              >
                {GARDEN_METHODS.map((m, i) => {
                  const eng = [88, 74, 73, 63, 52, 36, 30, 17][i];
                  return (
                    <div
                      key={m.id}
                      style={{
                        background: "var(--a-b)",
                        borderRadius: 10,
                        padding: ".95rem 1rem",
                        border: "1px solid var(--a-b)",
                        transition: "all .2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = m.color)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = "var(--a-b)")
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: ".5rem",
                        }}
                      >
                        <span style={{ fontSize: "1.3rem" }}>{m.icon}</span>
                        <span
                          style={{
                            fontSize: ".62rem",
                            fontFamily: "JetBrains Mono,monospace",
                            color: m.color,
                            background: m.color + "18",
                            padding: ".14rem .42rem",
                            borderRadius: 5,
                          }}
                        >
                          {eng}%
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: ".74rem",
                          fontWeight: 600,
                          color: "var(--a-w)",
                          marginBottom: ".22rem",
                        }}
                      >
                        {m.title}
                      </div>
                      <div style={{ fontSize: ".63rem", color: "var(--a-t)" }}>
                        {m.difficulty} · {m.space}
                      </div>
                      <div
                        style={{
                          height: 3,
                          background: "var(--a-s)",
                          borderRadius: 2,
                          marginTop: ".6rem",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: eng + "%",
                            background: m.color,
                            borderRadius: 2,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ── USERS TAB ── */}
        {tab === "users" && (
          <>
            <div
              style={{
                fontFamily: "Cormorant Garamond,serif",
                fontSize: "1.7rem",
                fontWeight: 600,
                color: "var(--a-w)",
                marginBottom: "1.4rem",
              }}
            >
              User Analytics
            </div>
            <div className="adm-row adm-row-3">
              {[
                {
                  label: "Total Users",
                  val: "14,203",
                  sub: "Registered accounts",
                  color: "var(--a-ac)",
                },
                {
                  label: "Monthly Active",
                  val: "9,841",
                  sub: "Unique users (30d)",
                  color: "#3A6A8A",
                },
                {
                  label: "Avg Session",
                  val: "6m 42s",
                  sub: "Per user visit",
                  color: "#C8780A",
                },
              ].map((k, i) => (
                <div
                  key={i}
                  className="panel"
                  style={{ textAlign: "center", padding: "1.8rem" }}
                >
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond,serif",
                      fontSize: "2.4rem",
                      fontWeight: 600,
                      color: k.color,
                    }}
                  >
                    {k.val}
                  </div>
                  <div
                    style={{
                      fontSize: ".72rem",
                      fontWeight: 600,
                      color: "var(--a-w)",
                      margin: ".3rem 0 .2rem",
                    }}
                  >
                    {k.label}
                  </div>
                  <div style={{ fontSize: ".64rem", color: "var(--a-t)" }}>
                    {k.sub}
                  </div>
                </div>
              ))}
            </div>
            <div className="adm-row adm-row-2" style={{ marginTop: "1rem" }}>
              <div className="panel">
                <div className="panel-title">User Segments</div>
                <div className="donut-wrap">
                  <Donut
                    data={DEMO.userSegments.map((s) => ({
                      ...s,
                      count: s.pct,
                    }))}
                    size={110}
                  />
                  <div className="donut-legend">
                    {DEMO.userSegments.map((s, i) => (
                      <div key={i} className="donut-leg-row">
                        <div
                          className="donut-dot"
                          style={{ background: s.color }}
                        />
                        <span className="donut-leg-lbl">{s.segment}</span>
                        <span className="donut-leg-val">{s.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="panel-title">Growth Trend</div>
                <AreaChart data={DEMO.monthlyUsers} color="#3A6A8A" />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: ".8rem",
                    marginTop: "1.2rem",
                  }}
                >
                  {[
                    { l: "New users", v: "+2,140" },
                    { l: "Returning", v: "68%" },
                    { l: "Churn", v: "2.1%" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      style={{
                        background: "var(--a-b)",
                        borderRadius: 8,
                        padding: ".7rem",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: ".82rem",
                          fontWeight: 600,
                          color: "var(--a-w)",
                        }}
                      >
                        {s.v}
                      </div>
                      <div
                        style={{
                          fontSize: ".6rem",
                          color: "var(--a-t)",
                          marginTop: ".14rem",
                        }}
                      >
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Geo table */}
            <div className="panel" style={{ marginTop: "1rem" }}>
              <div className="panel-title">
                Top Regions <span className="panel-sub">by user count</span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr)",
                  gap: ".7rem",
                }}
              >
                {[
                  { region: "Maharashtra", users: 3420, pct: 24 },
                  { region: "Karnataka", users: 2840, pct: 20 },
                  { region: "Tamil Nadu", users: 2210, pct: 16 },
                  { region: "Delhi NCR", users: 1980, pct: 14 },
                  { region: "Telangana", users: 1640, pct: 12 },
                  { region: "Kerala", users: 1180, pct: 8 },
                  { region: "Gujarat", users: 930, pct: 7 },
                ].map((r, i) => (
                  <div
                    key={i}
                    style={{
                      background: "var(--a-b)",
                      borderRadius: 9,
                      padding: ".8rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: ".28rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontSize: ".72rem",
                          color: "var(--a-w)",
                          fontWeight: 500,
                        }}
                      >
                        {r.region}
                      </span>
                      <span
                        style={{
                          fontSize: ".66rem",
                          fontFamily: "JetBrains Mono,monospace",
                          color: "var(--a-ac)",
                        }}
                      >
                        {r.pct}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 3,
                        background: "var(--a-s)",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: r.pct + "%",
                          background: "var(--a-ac)",
                        }}
                      />
                    </div>
                    <div style={{ fontSize: ".62rem", color: "var(--a-t)" }}>
                      {r.users.toLocaleString()} users
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── ACTIVITY TAB ── */}
        {tab === "activity" && (
          <>
            <div
              style={{
                fontFamily: "Cormorant Garamond,serif",
                fontSize: "1.7rem",
                fontWeight: 600,
                color: "var(--a-w)",
                marginBottom: "1.4rem",
              }}
            >
              Live Activity Feed
            </div>
            <div className="adm-row adm-row-12">
              <div className="panel">
                <div className="panel-title">
                  <span>
                    <span className="live-dot" />
                    Real-time Events
                  </span>
                  <span className="panel-sub">
                    {DEMO.recentActions.length} recent
                  </span>
                </div>
                {DEMO.recentActions.map((a, i) => (
                  <div
                    key={i}
                    className="feed-row"
                    style={{
                      animationDelay: i * 0.05 + "s",
                      animation: "fadeUp .3s ease both",
                    }}
                  >
                    <div
                      className="feed-dot"
                      style={{ background: feedColors[a.type] || "var(--a-t)" }}
                    />
                    <div className="feed-user">{a.user}</div>
                    <div className="feed-action">{a.action}</div>
                    <div
                      style={{
                        fontSize: ".62rem",
                        color: feedColors[a.type],
                        background: feedColors[a.type] + "18",
                        padding: ".1rem .4rem",
                        borderRadius: 5,
                        flexShrink: 0,
                        fontFamily: "JetBrains Mono,monospace",
                        marginRight: ".4rem",
                      }}
                    >
                      {a.type}
                    </div>
                    <div className="feed-time">{a.time}</div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div className="panel">
                  <div className="panel-title">Event Types (24h)</div>
                  {Object.entries(feedColors).map(([type, color], i) => {
                    const counts = [42, 18, 67, 28, 15];
                    return (
                      <div key={i} className="bar-row">
                        <div
                          className="bar-lbl"
                          style={{ textTransform: "capitalize" }}
                        >
                          {type}
                        </div>
                        <div className="bar-track">
                          <div
                            className="bar-fill"
                            style={{
                              width: (counts[i] / 67) * 100 + "%",
                              background: color,
                            }}
                          />
                        </div>
                        <div className="bar-val">{counts[i]}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="panel">
                  <div className="panel-title">Startup Registrations</div>
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond,serif",
                      fontSize: "2rem",
                      fontWeight: 600,
                      color: "var(--a-w)",
                      marginBottom: ".2rem",
                    }}
                  >
                    312
                  </div>
                  <div
                    style={{
                      fontSize: ".68rem",
                      color: "#3FB950",
                      marginBottom: "1rem",
                    }}
                  >
                    ▲ +8.3% this month
                  </div>
                  {[
                    { stage: "Idea Stage", n: 142, pct: 46 },
                    { stage: "Prototype", n: 98, pct: 31 },
                    { stage: "Early Revenue", n: 54, pct: 17 },
                    { stage: "Scaling", n: 18, pct: 6 },
                  ].map((s, i) => (
                    <div key={i} className="bar-row">
                      <div className="bar-lbl">{s.stage}</div>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{
                            width: s.pct + "%",
                            background: "var(--a-ac)",
                          }}
                        />
                      </div>
                      <div className="bar-val">{s.n}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Search terms */}
            <div className="panel" style={{ marginTop: "1rem" }}>
              <div className="panel-title">
                Top Search Queries{" "}
                <span className="panel-sub">last 30 days</span>
              </div>
              <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                {[
                  "ashwagandha",
                  "stress relief",
                  "anti-diabetic plants",
                  "brahmi for memory",
                  "turmeric benefits",
                  "immunity herbs",
                  "sleep herbs",
                  "adaptogen",
                  "anti-inflammatory",
                  "skin care plants",
                  "women health",
                  "neem uses",
                  "moringa nutrition",
                  "ginger tea",
                  "tulsi",
                ].map((q, i) => (
                  <div
                    key={i}
                    style={{
                      background: "var(--a-b)",
                      border: "1px solid var(--a-b)",
                      borderRadius: 20,
                      padding: ".28rem .75rem",
                      fontSize: ".7rem",
                      color: "var(--a-w)",
                      cursor: "default",
                      transition: "all .18s",
                      display: "flex",
                      alignItems: "center",
                      gap: ".38rem",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "var(--a-ac)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "var(--a-b)")
                    }
                  >
                    <span
                      style={{
                        fontSize: ".58rem",
                        color: "var(--a-t)",
                        fontFamily: "JetBrains Mono,monospace",
                      }}
                    >
                      #{i + 1}
                    </span>
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── PLANT 3D CARD ────────────────────────────────────────────────────────
function PlantCard({ plant, onClick }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const mv = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -10,
      y: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 10,
    });
    setGlow({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };
  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={mv}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setHov(false);
      }}
      style={{
        background: hov ? "#fff" : "#FDFCFA",
        border: `1px solid \${hov ? plant.color+'77' : 'var(--mist)'}`,
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        transform: `perspective(860px) rotateX(\${tilt.x}deg) rotateY(\${tilt.y}deg)\${hov?' scale(1.03) translateY(-4px)':''}`,
        transition: hov
          ? "transform .08s,box-shadow .14s,border-color .18s"
          : "transform .38s,box-shadow .38s,border-color .28s",
        boxShadow: hov
          ? `0 18px 44px \${plant.color}24`
          : "0 2px 8px rgba(0,0,0,.04)",
        position: "relative",
        animation: "fadeUp .38s ease both",
      }}
    >
      {hov && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            borderRadius: 14,
            background: `radial-gradient(circle at \${glow.x}% \${glow.y}%, \${plant.accent}22 0%, transparent 56%)`,
          }}
        />
      )}
      <div
        style={{
          height: 112,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg,\${plant.color}18,\${plant.accent}30)`,
          position: "relative",
        }}
      >
        {plant.ayush && (
          <div
            style={{
              position: "absolute",
              top: 7,
              right: 7,
              background: plant.color + "CC",
              color: "#fff",
              borderRadius: 6,
              padding: "2px 7px",
              fontSize: ".56rem",
              fontWeight: 600,
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            {plant.ayush}
          </div>
        )}
        <span
          style={{
            fontSize: hov ? "4.2rem" : "3.8rem",
            transition: "all .28s",
            filter: hov ? `drop-shadow(0 4px 14px \${plant.color}50)` : "none",
            transform: hov ? "translateY(-2px)rotate(3deg)" : "none",
            display: "block",
          }}
        >
          {plant.emoji}
        </span>
      </div>
      <div style={{ padding: ".95rem" }}>
        <div
          style={{
            fontSize: ".59rem",
            fontWeight: 500,
            letterSpacing: ".13em",
            textTransform: "uppercase",
            color: "var(--el)",
            marginBottom: ".18rem",
          }}
        >
          {plant.region} · {plant.era}
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "1.3rem",
            fontWeight: 600,
            color: "var(--ink)",
            lineHeight: 1.1,
          }}
        >
          {plant.name}
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: "italic",
            fontSize: ".76rem",
            color: "var(--gl)",
            marginBottom: ".48rem",
          }}
        >
          {plant.latin}
        </div>
        <div
          style={{
            fontSize: ".72rem",
            color: "var(--e)",
            lineHeight: 1.44,
            marginBottom: ".65rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {plant.summary}
        </div>
        <div className="tag-row">
          {plant.tags.slice(0, 2).map((t) => (
            <span key={t} className="tag" style={{ color: plant.color }}>
              {t}
            </span>
          ))}
        </div>
        {hov && (
          <div
            style={{
              marginTop: ".65rem",
              fontSize: ".66rem",
              fontWeight: 500,
              color: plant.color,
            }}
          >
            View Full Profile →
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PLANT DETAIL ──────────────────────────────────────────────────────────
function PlantDetail({ plant, allPlants, onBack, onGrow, onRelated }) {
  const [hovK, setHovK] = useState(null);
  const related = allPlants
    .filter(
      (p) => p.id !== plant.id && p.tags.some((t) => plant.tags.includes(t))
    )
    .slice(0, 6);
  const KC = [
    {
      id: "hist",
      lbl: "Historical Roots",
      icon: "📜",
      hbg: plant.color + "10",
      ic: plant.color + "20",
      lc: plant.color,
      body: plant.history,
    },
    {
      id: "trad",
      lbl: "Traditional Use",
      icon: "🏺",
      hbg: "#C8780A10",
      ic: "#C8780A20",
      lc: "#C8780A",
      body: plant.traditional,
    },
    {
      id: "mod",
      lbl: "Modern Science",
      icon: "🔬",
      hbg: "#3A6A8A10",
      ic: "#3A6A8A20",
      lc: "#3A6A8A",
      body: plant.modern,
    },
    {
      id: "fut",
      lbl: "Future Potential",
      icon: "🔭",
      hbg: "#5A3A8A10",
      ic: "#5A3A8A20",
      lc: "#5A3A8A",
      body: plant.future,
    },
  ];
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--c)",
        animation: "fadeIn .35s ease",
      }}
    >
      {/* Hero */}
      <div
        className="pd-hero"
        style={{
          background: `linear-gradient(145deg,\${plant.color}CC 0%,\${plant.accent}99 50%,\${plant.color}EE 100%)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle,rgba(255,255,255,.07) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {[plant.emoji, "🌿", "✨", "🍃", "🌱"].map((e, i) => (
          <div
            key={i}
            className="pd-float"
            style={{
              left: `\${12+i*17}%`,
              top: `\${18+(i%3)*22}%`,
              animationDelay: `\${i*1.1}s`,
              animationDuration: `\${6+i*.8}s`,
              fontSize: `\${2+i%2}rem`,
            }}
          >
            {e}
          </div>
        ))}
        <div className="pd-hero-vignette" />
        <button className="pd-back" onClick={onBack}>
          ← Back to Garden
        </button>
        {plant.ayush && (
          <div
            className="pd-ayush-badge"
            style={{
              background: plant.color + "CC",
              border: "1px solid rgba(255,255,255,.22)",
              color: "#fff",
            }}
          >
            {plant.ayush}
          </div>
        )}
        <div className="pd-emoji-stage">
          <div className="pd-ring">
            <div
              className="pd-orb"
              style={{
                animationDuration: "3s",
                background: "rgba(255,255,255,.7)",
              }}
            />
            <div
              className="pd-orb"
              style={{
                animationDuration: "5s",
                animationDelay: "-2s",
                background: plant.accent,
              }}
            />
            <span className="pd-emoji-main">{plant.emoji}</span>
          </div>
        </div>
        <div className="pd-hero-info">
          <div className="pd-region-pill">
            🌍 {plant.region} &nbsp;·&nbsp; Since {plant.era}
          </div>
          <div className="pd-name">{plant.name}</div>
          <div className="pd-latin">{plant.latin}</div>
        </div>
      </div>

      {/* Content */}
      <div className="pd-content">
        {/* Stats bar */}
        <div className="pd-stats-bar">
          {[
            { l: "AYUSH System", v: plant.ayush || "Traditional" },
            { l: "Origin Region", v: plant.region },
            { l: "Historical Era", v: plant.era },
            { l: "Primary Use", v: plant.tags[0] },
          ].map((s, i) => (
            <div key={i} className="pd-stat">
              <div className="pd-stat-lbl">{s.l}</div>
              <div
                className="pd-stat-val"
                style={{ color: i === 0 ? plant.color : "var(--ink)" }}
              >
                {s.v}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="pd-tags">
          {plant.tags.map((t, i) => (
            <div
              key={i}
              className="pd-tag"
              style={{
                background: i === 0 ? plant.color : plant.color + "18",
                color: i === 0 ? "#fff" : plant.color,
                border: `1px solid \${plant.color}30`,
              }}
            >
              {i === 0 && "⭐ "}
              {t}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          className="pd-summary"
          style={{
            background: `linear-gradient(135deg,\${plant.color}0E,\${plant.accent}16)`,
            border: `1px solid \${plant.color}20`,
          }}
        >
          <div className="pd-summary-bigq">"</div>
          <div className="pd-summary-quote">"{plant.summary}"</div>
          <div
            style={{
              marginTop: ".85rem",
              display: "flex",
              alignItems: "center",
              gap: ".45rem",
            }}
          >
            <div
              style={{
                width: 28,
                height: 2,
                background: plant.color,
                borderRadius: 1,
              }}
            />
            <div
              style={{
                fontSize: ".66rem",
                fontWeight: 500,
                letterSpacing: ".13em",
                textTransform: "uppercase",
                color: plant.color,
              }}
            >
              Plant Essence
            </div>
          </div>
        </div>

        {/* Knowledge cards */}
        <div className="pd-sec-ttl">
          <span style={{ color: plant.color }}>✦</span> The Complete Story{" "}
          <div className="pd-sec-line" />
        </div>
        <div className="pd-knowledge">
          {KC.map((k, i) => (
            <div
              key={k.id}
              className="pd-k"
              style={{
                background: "#fff",
                border: `1px solid \${hovK===k.id?k.lc+'44':'var(--mist)'}`,
                boxShadow: hovK === k.id ? `0 12px 36px \${k.lc}14` : "none",
                animation: `\${i<2?'fadeUp':'fadeUp'} .42s \${i*.1}s ease both`,
              }}
              onMouseEnter={() => setHovK(k.id)}
              onMouseLeave={() => setHovK(null)}
            >
              <div
                className="pd-k-head"
                style={{
                  background: hovK === k.id ? k.hbg : "transparent",
                  borderBottom: `1px solid \${k.lc}14`,
                  transition: "background .2s",
                }}
              >
                <div className="pd-k-icon" style={{ background: k.ic }}>
                  {k.icon}
                </div>
                <div>
                  <div className="pd-k-lbl" style={{ color: k.lc }}>
                    {k.lbl}
                  </div>
                  <div className="pd-k-ttl">
                    {plant.name}'s {k.lbl.split(" ")[0]}
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: k.lc,
                    opacity: hovK === k.id ? 1 : 0.25,
                    transition: "opacity .2s",
                  }}
                />
              </div>
              <div className="pd-k-body">{k.body}</div>
            </div>
          ))}
        </div>

        {/* Timeline strip */}
        <div className="pd-sec-ttl">
          <span>📅</span> Through Time <div className="pd-sec-line" />
        </div>
        <div className="pd-tl">
          {[
            { era: plant.era, lbl: "First recorded", fill: true },
            { era: "Medieval", lbl: "Tradition grows" },
            { era: "1800s", lbl: "Scientific study" },
            { era: "2000s", lbl: "Clinical trials" },
            { era: "Today", lbl: "Global research", fill: true },
          ].map((n, i, arr) => (
            <React.Fragment key={i}>
              <div className="pd-tl-node">
                <div
                  className="pd-tl-dot"
                  style={{
                    borderColor: plant.color,
                    background: n.fill ? plant.color : "#fff",
                    width: n.fill ? 14 : 10,
                    height: n.fill ? 14 : 10,
                  }}
                />
                <div className="pd-tl-era" style={{ color: plant.color }}>
                  {n.era}
                </div>
                <div className="pd-tl-evt">{n.lbl}</div>
              </div>
              {i < arr.length - 1 && (
                <div
                  className="pd-tl-line"
                  style={{
                    background: `linear-gradient(to right,\${plant.color}70,\${plant.color}18)`,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Growing guide CTA */}
        <div
          className="pd-grow"
          style={{
            background: `linear-gradient(135deg,\${plant.color}10,\${plant.accent}18)`,
            border: `1px solid \${plant.color}22`,
          }}
        >
          <div>
            <div
              style={{
                fontSize: ".6rem",
                fontWeight: 500,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: plant.color,
                marginBottom: ".45rem",
              }}
            >
              🌱 Growing Guide
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "1.45rem",
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: ".35rem",
              }}
            >
              Grow {plant.name} at Home
            </div>
            <div
              style={{
                fontSize: ".78rem",
                color: "var(--el)",
                lineHeight: 1.5,
                maxWidth: 380,
              }}
            >
              8 methods — home garden, terrace, balcony, kitchen, indoor,
              vertical, container, hydroponic. Full seasonal calendar included.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".55rem",
              flexShrink: 0,
            }}
          >
            <button
              className="bp"
              onClick={onGrow}
              style={{ background: plant.color }}
            >
              Open Growing Guide →
            </button>
            <div
              style={{
                display: "flex",
                gap: ".38rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {["🏡", "🏗️", "🌆", "🍳", "🛋️"].map((e, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: ".7rem",
                    background: plant.color + "12",
                    borderRadius: 6,
                    padding: ".18rem .45rem",
                  }}
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <>
            <div className="pd-sec-ttl" style={{ marginTop: ".5rem" }}>
              <span>🌿</span> Related Plants <div className="pd-sec-line" />
            </div>
            <div className="pd-related">
              {related.map((rp) => (
                <div
                  key={rp.id}
                  className="pd-rel-card"
                  onClick={() => onRelated(rp)}
                >
                  <span
                    style={{
                      fontSize: "2rem",
                      display: "block",
                      marginBottom: ".35rem",
                    }}
                  >
                    {rp.emoji}
                  </span>
                  <div className="pd-rel-name">{rp.name}</div>
                  <div className="pd-rel-tag">{rp.tags[0]}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────
export default function Viridyan() {
  const [page, setPage] = useState("home");
  const [selPlant, setSelPlant] = useState(null);
  const [selProj, setSelProj] = useState(null);
  const [selMethod, setSelMethod] = useState("home");
  const [gTab, setGTab] = useState("methods");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [fStep, setFStep] = useState(0);
  const [fData, setFData] = useState({});
  const [fDone, setFDone] = useState(false);
  const [hovStat, setHovStat] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const go = (p, extra) => {
    setPage(p);
    setSelPlant(null);
    setSelProj(null);
    if (extra?.plant) setTimeout(() => setSelPlant(extra.plant), 10);
    if (extra?.filter) setFilter(extra.filter);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const allTags = useMemo(
    () => ["All", ...Array.from(new Set(PLANTS.flatMap((p) => p.tags)))],
    []
  );
  const filtered = useMemo(
    () =>
      PLANTS.filter((p) => {
        const q = search.toLowerCase();
        return (
          (!q ||
            [p.name, p.latin, p.region, ...p.tags].some((x) =>
              x.toLowerCase().includes(q)
            )) &&
          (filter === "All" || p.tags.includes(filter))
        );
      }),
    [search, filter]
  );

  const marquee = useMemo(
    () => [...PLANTS.slice(0, 30), ...PLANTS.slice(0, 30)],
    []
  );
  const M = GARDEN_METHODS.find((m) => m.id === selMethod) || GARDEN_METHODS[0];

  if (isAdmin)
    return (
      <>
        <style>{STYLES}</style>
        <AdminDashboard onExit={() => setIsAdmin(false)} />
      </>
    );

  return (
    <>
      <style>{STYLES}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => go("home")}>
          🌿 Viridyan
        </div>
        <div className="nav-links">
          {[
            ["explore", "Garden"],
            ["garden", "Grow"],
            ["timecapsule", "Timeline"],
            ["startup", "Register"],
            ["community", "Community"],
            ["future", "Future"],
          ].map(([p, l]) => (
            <button
              key={p}
              className={`nb \${page===p?'active':''}`}
              onClick={() => go(p)}
            >
              {l}
            </button>
          ))}
          <button
            className="nb"
            style={{
              borderLeft: "1px solid var(--mist)",
              marginLeft: ".3rem",
              paddingLeft: ".8rem",
              background: "var(--ink)",
              color: "#fff",
              opacity: 1,
              borderRadius: 20,
              fontWeight: 600,
            }}
            onClick={() => setIsAdmin(true)}
          >
            ⚙ Admin
          </button>
        </div>
        <div className="ns">
          <span style={{ fontSize: ".76rem" }}>🔍</span>
          <input
            placeholder="Search 100 plants…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (page !== "explore") go("explore");
            }}
          />
        </div>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <div className="page">
          <div className="home-hero">
            <div className="home-bg" />
            {["🌿", "🍃", "☘️", "🌱"].map((e, i) => (
              <span
                key={i}
                className="leaf-d"
                style={{
                  [i < 2 ? "top" : "bottom"]: i % 2 === 0 ? "8%" : "18%",
                  [i < 2 ? "left" : "right"]: i % 2 === 0 ? "3%" : "4%",
                  fontSize: ["6rem", "5rem", "3rem", "3.5rem"][i],
                  animationDelay: i + "s",
                }}
              >
                {e}
              </span>
            ))}
            <p
              style={{
                fontSize: ".65rem",
                fontWeight: 500,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--gl)",
                marginBottom: ".9rem",
                animation: "fadeUp .6s ease both",
              }}
            >
              ✦ 100 Plants · 8 Garden Methods · 5,000 Years of Wisdom ✦
            </p>
            <h1 className="h1">
              Where <em>Roots</em> Meet
              <br />
              the Future
            </h1>
            <p className="h-sub">
              The world's most comprehensive digital medicine garden — from
              ancient AYUSH wisdom to your balcony, kitchen, and terrace.
            </p>
            <div
              style={{
                display: "flex",
                gap: ".6rem",
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: "1.8rem",
                animation: "fadeUp .6s .3s ease both",
              }}
            >
              <button className="bp" onClick={() => go("explore")}>
                Enter the Garden →
              </button>
              <button className="bs" onClick={() => go("garden")}>
                🌱 Start Growing
              </button>
            </div>
            <div className="marquee-w">
              <div className="marquee-t">
                {marquee.map((p, i) => (
                  <div
                    key={i}
                    className="mpill"
                    onClick={() => go("explore", { plant: p })}
                  >
                    <span>{p.emoji}</span>
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="hcards">
              {[
                {
                  p: "explore",
                  icon: "🌿",
                  lbl: "Living Library",
                  t: "100 Medicinal Plants",
                  d: "AYUSH-categorized plant profiles with 3D interactive hover cards and deep knowledge profiles.",
                },
                {
                  p: "garden",
                  icon: "🏡",
                  lbl: "Grow at Home",
                  t: "Gardening Hub",
                  d: "8 methods: Home, Terrace, Kitchen, Balcony, Indoor, Vertical, Hydroponic, Container.",
                },
                {
                  p: "timecapsule",
                  icon: "⏳",
                  lbl: "Through the Ages",
                  t: "Time Capsule",
                  d: "12 chapters of botanical history spanning 5,000 years across ancient civilizations.",
                },
                {
                  p: "startup",
                  icon: "🚀",
                  lbl: "Build the Future",
                  t: "Startup Register",
                  d: "Government-backed incubation, grants, and mentorship for botanical ventures.",
                },
                {
                  p: "community",
                  icon: "🤝",
                  lbl: "Shared Wisdom",
                  t: "Community Corner",
                  d: "Real projects by researchers and rural innovators across India.",
                },
                {
                  p: "future",
                  icon: "🔭",
                  lbl: "The Road Ahead",
                  t: "Future Impact",
                  d: "How traditional plants are reshaping global healthcare and sustainability.",
                },
              ].map((c, i) => (
                <div key={i} className="hcard" onClick={() => go(c.p)}>
                  <div style={{ fontSize: "1.45rem", marginBottom: ".4rem" }}>
                    {c.icon}
                  </div>
                  <div
                    style={{
                      fontSize: ".59rem",
                      fontWeight: 500,
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      color: "var(--gl)",
                      marginBottom: ".2rem",
                    }}
                  >
                    {c.lbl}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: ".26rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {c.t}
                  </div>
                  <div
                    style={{
                      fontSize: ".7rem",
                      color: "var(--el)",
                      lineHeight: 1.42,
                    }}
                  >
                    {c.d}
                  </div>
                </div>
              ))}
            </div>
            {/* Admin banner */}
            <div
              onClick={() => setIsAdmin(true)}
              style={{
                cursor: "pointer",
                marginTop: "1rem",
                width: "100%",
                maxWidth: 780,
                background: "var(--ink)",
                borderRadius: 16,
                padding: "1.2rem 1.8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                border: "1px solid #2E3830",
                transition: "all .2s",
                animation: "fadeUp .6s .6s ease both",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2E3830";
                e.currentTarget.style.borderColor = "#4A6741";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--ink)";
                e.currentTarget.style.borderColor = "#2E3830";
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "#4A6741",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    flexShrink: 0,
                  }}
                >
                  ⚙
                </div>
                <div>
                  <div
                    style={{
                      fontSize: ".58rem",
                      fontWeight: 500,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "#4A6741",
                      marginBottom: ".2rem",
                    }}
                  >
                    Developer Access
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "#F7F3EC",
                      lineHeight: 1,
                    }}
                  >
                    Admin Dashboard
                  </div>
                  <div
                    style={{
                      fontSize: ".67rem",
                      color: "#8B949E",
                      marginTop: ".2rem",
                    }}
                  >
                    Analytics · Users · Plants · Garden · Activity
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".6rem",
                  flexShrink: 0,
                }}
              >
                <div style={{ display: "flex", gap: ".4rem" }}>
                  {["14.2K users", "100 plants", "5 tabs"].map((b, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: ".6rem",
                        background: "rgba(74,103,65,.18)",
                        border: "1px solid rgba(74,103,65,.3)",
                        color: "#4A6741",
                        borderRadius: 9,
                        padding: ".18rem .55rem",
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
                <span style={{ color: "#4A6741", fontSize: "1rem" }}>→</span>
              </div>
            </div>
          </div>
          <div className="home-stats">
            {[
              ["100", "Plants Documented", "explore"],
              ["8", "Garden Methods", "garden"],
              ["6", "Starter Kits", "garden"],
              ["12", "Timeline Events", "timecapsule"],
              ["5,000+", "Years of History", "timecapsule"],
            ].map(([n, l, dest]) => (
              <div
                key={l}
                className="stat"
                onClick={() => go(dest)}
                onMouseEnter={() => setHovStat(l)}
                onMouseLeave={() => setHovStat(null)}
              >
                <div
                  className="stat-n"
                  style={{ color: hovStat === l ? "var(--gold)" : undefined }}
                >
                  {n}
                </div>
                <div className="stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXPLORE */}
      {page === "explore" && !selPlant && (
        <div className="page">
          <div className="sh">
            <div className="sh-eye">🌿 AYUSH Medicinal Garden</div>
            <h2 className="sh-title">
              Explore <em>the Garden</em>
            </h2>
            <p className="sh-sub">
              100 plants with 3D hover cards. Click any plant for its complete
              profile — history, science, and growing guide.
            </p>
          </div>
          <div className="filter-bar">
            {allTags.map((t) => (
              <button
                key={t}
                className={`fchip \${filter===t?'on':''}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 3rem",
              maxWidth: 1200,
              margin: "0 auto .9rem",
            }}
          >
            <span style={{ fontSize: ".73rem", color: "var(--el)" }}>
              Showing {filtered.length} of {PLANTS.length} plants
            </span>
            {(search || filter !== "All") && (
              <button
                className="bs"
                style={{ padding: ".24rem .8rem", fontSize: ".66rem" }}
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
              >
                Clear ✕
              </button>
            )}
          </div>
          <div className="plant-grid">
            {filtered.map((p, i) => (
              <PlantCard key={p.id} plant={p} onClick={() => setSelPlant(p)} />
            ))}
          </div>
        </div>
      )}
      {page === "explore" && selPlant && (
        <PlantDetail
          plant={selPlant}
          allPlants={PLANTS}
          onBack={() => setSelPlant(null)}
          onGrow={() => go("garden")}
          onRelated={(rp) => {
            setSelPlant(null);
            setTimeout(() => setSelPlant(rp), 50);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {/* GARDEN HUB */}
      {page === "garden" && (
        <div className="page">
          <div className="g-hero">
            <div className="g-hero-bg" />
            {["🌱", "🌿", "🍃", "🌺", "🪴", "☘️", "🌻", "🌸", "🌾", "🌲"].map(
              (e, i) => (
                <div
                  key={i}
                  className="gf"
                  style={{
                    left: `\${5+i*9.5}%`,
                    top: `\${22+Math.sin(i*1.3)*32}%`,
                    animationDelay: `\${i*.65}s`,
                    animationDuration: `\${5+i*.6}s`,
                    fontSize: `\${1.5+Math.sin(i)*.65}rem`,
                  }}
                >
                  {e}
                </div>
              )
            )}
            <p
              style={{
                fontSize: ".65rem",
                fontWeight: 500,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "rgba(184,205,180,.7)",
                marginBottom: ".7rem",
                position: "relative",
              }}
            >
              🌱 Complete Medicinal Plant Growing Guide
            </p>
            <h2 className="g-h1">
              Grow Your Own <em>Medicine Garden</em>
            </h2>
            <p
              style={{
                fontSize: ".88rem",
                color: "rgba(184,205,180,.7)",
                maxWidth: 500,
                position: "relative",
                lineHeight: 1.62,
              }}
            >
              From compact kitchen windowsills to full home garden plots — the
              right method, tools, plants, and seasonal calendar for wherever
              you live.
            </p>
          </div>
          <div className="g-tab-bar">
            {[
              ["methods", "🏡  Methods"],
              ["tips", "💡  Pro Tips"],
              ["kits", "🌿  Starter Kits"],
            ].map(([t, l]) => (
              <button
                key={t}
                className={`g-tab \${gTab===t?'active':''}`}
                onClick={() => setGTab(t)}
              >
                {l}
              </button>
            ))}
          </div>

          {gTab === "methods" && (
            <>
              <div className="method-scroll">
                {GARDEN_METHODS.map((m) => (
                  <button
                    key={m.id}
                    className={`m-btn \${selMethod===m.id?'active':''}`}
                    style={selMethod === m.id ? { background: m.color } : {}}
                    onClick={() => setSelMethod(m.id)}
                  >
                    {m.icon} {m.title}
                    {m.tag && (
                      <span
                        style={{
                          background: "rgba(0,0,0,.14)",
                          borderRadius: 8,
                          padding: "1px 5px",
                          fontSize: ".6rem",
                        }}
                      >
                        {m.tag}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="m-wrap">
                <div
                  className="m-banner"
                  style={{
                    background: `linear-gradient(135deg,${M.color} 0%,${M.color}DD 60%,${M.accent}99 100%)`,
                    boxShadow: `0 8px 32px ${M.color}55`,
                  }}
                >
                  <div className="m-banner-mesh" />
                  <div style={{ position: "relative", flex: 1, minWidth: 255 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: ".45rem",
                        flexWrap: "wrap",
                        marginBottom: ".75rem",
                      }}
                    >
                      <span
                        className="m-badge"
                        style={{
                          background: "rgba(0,0,0,.25)",
                          border: "1px solid rgba(255,255,255,.3)",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      >
                        ⭐ {M.difficulty}
                      </span>
                      <span
                        className="m-badge"
                        style={{
                          background: "rgba(0,0,0,.25)",
                          border: "1px solid rgba(255,255,255,.3)",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      >
                        📐 {M.space}
                      </span>
                      <span
                        className="m-badge"
                        style={{
                          background: "rgba(0,0,0,.25)",
                          border: "1px solid rgba(255,255,255,.3)",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      >
                        💰 {M.invest}
                      </span>
                    </div>
                    <div
                      className="m-title"
                      style={{
                        color: "#fff",
                        textShadow: "0 2px 12px rgba(0,0,0,.3)",
                      }}
                    >
                      {M.icon} {M.title}
                    </div>
                    <div
                      style={{
                        fontSize: ".92rem",
                        color: "rgba(255,255,255,.92)",
                        lineHeight: 1.65,
                        maxWidth: 490,
                        fontWeight: 400,
                        marginTop: ".5rem",
                        textShadow: "0 1px 4px rgba(0,0,0,.2)",
                      }}
                    >
                      {M.description}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: ".38rem",
                        marginTop: ".85rem",
                      }}
                    >
                      {M.bestFor.map((b, i) => (
                        <span
                          key={i}
                          style={{
                            borderRadius: 18,
                            padding: ".28rem .85rem",
                            fontSize: ".72rem",
                            fontWeight: 600,
                            background: "rgba(0,0,0,.22)",
                            border: "1px solid rgba(255,255,255,.35)",
                            color: "#fff",
                            letterSpacing: ".02em",
                          }}
                        >
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className="m-emoji"
                    style={{
                      filter: "drop-shadow(0 8px 24px rgba(0,0,0,.35))",
                    }}
                  >
                    {M.icon}
                  </div>
                </div>
                <div className="specs">
                  {[
                    ["☀️ Sunlight", M.sunlight],
                    ["💧 Watering", M.water],
                    ["📐 Space", M.space],
                    ["⭐ Difficulty", M.difficulty],
                    ["💰 Investment", M.invest],
                  ].map(([l, v]) => (
                    <div key={l} className="spec">
                      <div className="spec-lbl">{l}</div>
                      <div className="spec-val">{v}</div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: ".95rem",
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <span style={{ color: M.color }}>★</span> Expert Growing Tips
                </div>
                <div className="tips-grid">
                  {M.tips.map((tip, i) => (
                    <div key={i} className="tip-card">
                      <div
                        className="tip-accent"
                        style={{ background: M.color }}
                      />
                      <div
                        style={{ fontSize: "1.5rem", marginBottom: ".45rem" }}
                      >
                        {tip.icon}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: "1.02rem",
                          fontWeight: 600,
                          color: "var(--ink)",
                          marginBottom: ".34rem",
                        }}
                      >
                        {tip.title}
                      </div>
                      <div
                        style={{
                          fontSize: ".77rem",
                          color: "var(--e)",
                          lineHeight: 1.54,
                        }}
                      >
                        {tip.body}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="plants-box">
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "1.12rem",
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: ".8rem",
                      display: "flex",
                      alignItems: "center",
                      gap: ".45rem",
                    }}
                  >
                    <span style={{ color: M.color }}>🌿</span> Best Plants for{" "}
                    {M.title}
                    <span
                      style={{
                        fontSize: ".67rem",
                        fontWeight: 400,
                        color: "var(--el)",
                        marginLeft: "auto",
                      }}
                    >
                      Click to explore →
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", gap: ".38rem", flexWrap: "wrap" }}
                  >
                    {M.plants.map((name, i) => {
                      const found = PLANTS.find(
                        (p) =>
                          name
                            .toLowerCase()
                            .split(" ")[0]
                            .includes(p.name.toLowerCase().split(" ")[0]) ||
                          p.name
                            .toLowerCase()
                            .split(" ")[0]
                            .includes(name.toLowerCase().split(" ")[0])
                      );
                      return (
                        <div
                          key={i}
                          className="ppill"
                          style={!found ? { cursor: "default" } : {}}
                          onClick={() =>
                            found && go("explore", { plant: found })
                          }
                        >
                          {found ? found.emoji : "🌿"} {name}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: ".85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <span style={{ color: M.color }}>📅</span> Seasonal Calendar
                </div>
                <div className="seasonal">
                  {M.seasonal.map((s, i) => (
                    <div
                      key={i}
                      className="season-card"
                      style={{ borderTopColor: M.color }}
                    >
                      <div
                        style={{
                          fontSize: ".67rem",
                          fontWeight: 600,
                          letterSpacing: ".11em",
                          textTransform: "uppercase",
                          color: M.color,
                          marginBottom: ".38rem",
                        }}
                      >
                        {s.season}
                      </div>
                      <div
                        style={{
                          fontSize: ".76rem",
                          color: "var(--e)",
                          lineHeight: 1.48,
                        }}
                      >
                        {s.tip}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: `linear-gradient(135deg,\${M.color}14,\${M.accent}22)`,
                    border: `1px solid \${M.color}28`,
                    borderRadius: 14,
                    padding: "1.6rem 1.8rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: ".9rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "1.28rem",
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginBottom: ".28rem",
                      }}
                    >
                      Ready to start your {M.title.toLowerCase()}?
                    </div>
                    <div style={{ fontSize: ".77rem", color: "var(--el)" }}>
                      Register your botanical initiative for seeds, support, and
                      mentorship.
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}
                  >
                    <button className="bp" onClick={() => go("startup")}>
                      Register Initiative →
                    </button>
                    <button className="bs" onClick={() => go("explore")}>
                      Browse Plants →
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {gTab === "tips" && (
            <>
              <div
                style={{
                  maxWidth: 1200,
                  margin: "0 auto",
                  padding: "1.8rem 3rem .9rem",
                }}
              >
                <div className="sh-eye">💡 Universal Growing Wisdom</div>
                <h2
                  className="sh-title"
                  style={{
                    fontSize: "2.1rem",
                    borderBottom: "none",
                    marginBottom: ".45rem",
                  }}
                >
                  Pro <em>Gardening Tips</em>
                </h2>
              </div>
              <div className="utips">
                {UNIVERSAL_TIPS.map((tip, i) => (
                  <div key={i} className="utip">
                    <div style={{ fontSize: "1.6rem", marginBottom: ".45rem" }}>
                      {tip.icon}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "1.04rem",
                        fontWeight: 600,
                        color: "var(--ink)",
                        marginBottom: ".34rem",
                      }}
                    >
                      {tip.title}
                    </div>
                    <div
                      style={{
                        fontSize: ".77rem",
                        color: "var(--e)",
                        lineHeight: 1.54,
                      }}
                    >
                      {tip.body}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  maxWidth: 1200,
                  margin: "0 auto",
                  padding: "0 3rem 3rem",
                }}
              >
                <div
                  style={{
                    background: "var(--ink)",
                    borderRadius: 18,
                    padding: "2.2rem",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(225px,1fr)",
                    gap: "1.2rem",
                  }}
                >
                  <div
                    style={{
                      gridColumn: "1/-1",
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "1.4rem",
                      color: "#F7F3EC",
                      marginBottom: ".15rem",
                      display: "flex",
                      alignItems: "center",
                      gap: ".45rem",
                    }}
                  >
                    ⚡ Common Problems & Organic Fixes
                  </div>
                  {PROBLEM_FIXES.map((r, i) => (
                    <div key={i}>
                      <div
                        style={{
                          fontSize: ".67rem",
                          fontWeight: 600,
                          color: "#E8C878",
                          textTransform: "uppercase",
                          letterSpacing: ".09em",
                          marginBottom: ".26rem",
                        }}
                      >
                        ⚠ {r.problem}
                      </div>
                      <div
                        style={{
                          fontSize: ".76rem",
                          color: "rgba(247,243,236,.7)",
                          lineHeight: 1.48,
                        }}
                      >
                        → {r.fix}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {gTab === "kits" && (
            <>
              <div
                style={{
                  maxWidth: 1200,
                  margin: "0 auto",
                  padding: "1.8rem 3rem .9rem",
                }}
              >
                <div className="sh-eye">🌿 Curated Medicinal Collections</div>
                <h2
                  className="sh-title"
                  style={{
                    fontSize: "2.1rem",
                    borderBottom: "none",
                    marginBottom: ".45rem",
                  }}
                >
                  Medicinal Starter <em>Kits</em>
                </h2>
                <p className="sh-sub" style={{ marginTop: 0 }}>
                  Purpose-built plant collections for specific health goals.
                  Designed for container or small-space growing.
                </p>
              </div>
              <div
                style={{
                  maxWidth: 1200,
                  margin: "0 auto",
                  padding: "0 3rem 3rem",
                }}
              >
                <div className="kits-grid">
                  {STARTER_KITS.map((kit, i) => (
                    <div
                      key={i}
                      className="kit"
                      style={{
                        background: kit.color,
                        boxShadow: `0 8px 28px \${kit.color}38`,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: "60%",
                          height: "100%",
                          background:
                            "radial-gradient(circle at 80% 30%,rgba(255,255,255,.1),transparent 60%)",
                          pointerEvents: "none",
                        }}
                      />
                      <div style={{ position: "relative" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: ".65rem",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: "1.7rem",
                                marginBottom: ".28rem",
                              }}
                            >
                              {kit.emoji}
                            </div>
                            <div
                              style={{
                                fontFamily: "'Cormorant Garamond',serif",
                                fontSize: "1.18rem",
                                fontWeight: 600,
                                color: "#fff",
                              }}
                            >
                              {kit.name}
                            </div>
                          </div>
                          <div
                            style={{
                              background: "rgba(255,255,255,.2)",
                              borderRadius: 18,
                              padding: ".18rem .62rem",
                              fontSize: ".76rem",
                              color: "#fff",
                              fontWeight: 600,
                              flexShrink: 0,
                            }}
                          >
                            {kit.price}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: ".32rem",
                            flexWrap: "wrap",
                            marginBottom: ".62rem",
                          }}
                        >
                          {kit.plants.map((p, j) => (
                            <span
                              key={j}
                              style={{
                                background: "rgba(255,255,255,.2)",
                                borderRadius: 9,
                                padding: ".15rem .52rem",
                                fontSize: ".66rem",
                                color: "#fff",
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                        <div
                          style={{
                            fontSize: ".72rem",
                            color: "rgba(255,255,255,.72)",
                            lineHeight: 1.48,
                            marginBottom: ".42rem",
                          }}
                        >
                          {kit.use}
                        </div>
                        <div
                          style={{
                            fontSize: ".65rem",
                            color: "rgba(255,255,255,.54)",
                            marginBottom: ".95rem",
                          }}
                        >
                          🌱 {kit.care}
                        </div>
                        <button
                          onClick={() => go("startup")}
                          style={{
                            background: "rgba(255,255,255,.16)",
                            border: "1px solid rgba(255,255,255,.32)",
                            borderRadius: 18,
                            color: "#fff",
                            padding: ".38rem 1rem",
                            fontSize: ".7rem",
                            fontWeight: 500,
                            cursor: "pointer",
                            fontFamily: "'DM Sans',sans-serif",
                            transition: "all .18s",
                          }}
                        >
                          Get This Kit →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--mist)",
                    borderRadius: 16,
                    padding: "1.8rem",
                    marginTop: "1.8rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "1.35rem",
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: "1.1rem",
                    }}
                  >
                    🧪 Universal Medicinal Herb Soil Mix
                  </div>
                  <div className="soil-grid">
                    {SOIL_MIX.map((s, i) => (
                      <div
                        key={i}
                        style={{
                          borderRadius: 9,
                          padding: ".8rem",
                          background: s.color + "12",
                          border: `1px solid \${s.color}28`,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: "1.6rem",
                            fontWeight: 600,
                            color: s.color,
                          }}
                        >
                          {s.pct}
                        </div>
                        <div
                          style={{
                            fontSize: ".75rem",
                            fontWeight: 500,
                            color: "var(--ink)",
                            margin: ".18rem 0 .13rem",
                          }}
                        >
                          {s.comp}
                        </div>
                        <div style={{ fontSize: ".65rem", color: "var(--el)" }}>
                          {s.note}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: ".9rem",
                      fontSize: ".76rem",
                      color: "var(--el)",
                      lineHeight: 1.58,
                      background: "var(--c)",
                      borderRadius: 7,
                      padding: ".7rem .95rem",
                    }}
                  >
                    💡 <strong>Readiness test:</strong> Squeeze a handful — it
                    should hold shape briefly, then crumble when tapped. Too
                    wet: add perlite. Too dry: add compost.
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* TIMELINE */}
      {page === "timecapsule" && (
        <div className="page">
          <div className="sh">
            <div className="sh-eye">⏳ Through the Ages</div>
            <h2 className="sh-title">
              The <em>Time Capsule</em>
            </h2>
            <p className="sh-sub">
              A chronicle of how medicinal plants shaped civilizations — from
              ancient scrolls to modern AI.
            </p>
          </div>
          <div className="tl-wrap">
            <div className="tl-line" />
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className="tl-item"
                style={{ animationDelay: `\${i*.055}s` }}
              >
                {i % 2 === 0 ? (
                  <>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: ".95rem",
                          fontWeight: 600,
                          color: "var(--g)",
                        }}
                      >
                        {item.era}
                      </div>
                      <div
                        style={{
                          fontSize: ".76rem",
                          color: "var(--ink)",
                          lineHeight: 1.34,
                        }}
                      >
                        {item.event}
                      </div>
                      <div
                        style={{
                          fontSize: ".63rem",
                          color: "var(--el)",
                          marginTop: ".08rem",
                        }}
                      >
                        🌿 {item.plant}
                      </div>
                    </div>
                    <div className="tl-dot">{item.icon}</div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="tl-dot">{item.icon}</div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond',serif",
                          fontSize: ".95rem",
                          fontWeight: 600,
                          color: "var(--g)",
                        }}
                      >
                        {item.era}
                      </div>
                      <div
                        style={{
                          fontSize: ".76rem",
                          color: "var(--ink)",
                          lineHeight: 1.34,
                        }}
                      >
                        {item.event}
                      </div>
                      <div
                        style={{
                          fontSize: ".63rem",
                          color: "var(--el)",
                          marginTop: ".08rem",
                        }}
                      >
                        🌿 {item.plant}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STARTUP */}
      {page === "startup" && (
        <div className="page">
          <div className="sh">
            <div className="sh-eye">🌱 Grow with Us</div>
            <h2 className="sh-title">
              Startup <em>Registration</em>
            </h2>
            <p className="sh-sub">
              Apply for government-backed incubation, grant funding, and
              mentorship for your botanical venture.
            </p>
          </div>
          <div className="fw">
            {!fDone ? (
              <>
                <div className="fp">
                  {FORM_STEPS.map((s, i) => (
                    <div
                      key={i}
                      className={`fstep \${i<fStep?'done':i===fStep?'cur':''}`}
                      onClick={() => i < fStep && setFStep(i)}
                    >
                      {i < fStep ? "✓ " : ""}
                      {s.label}
                    </div>
                  ))}
                </div>
                <div className="fc">
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "1.55rem",
                      color: "var(--ink)",
                      marginBottom: ".28rem",
                    }}
                  >
                    {
                      [
                        "Tell us about yourself",
                        "Your startup at a glance",
                        "Your impact vision",
                        "What support do you need?",
                      ][fStep]
                    }
                  </div>
                  <div
                    style={{
                      fontSize: ".74rem",
                      color: "var(--el)",
                      marginBottom: "1.3rem",
                    }}
                  >
                    Step {fStep + 1} of {FORM_STEPS.length}
                  </div>
                  {FORM_STEPS[fStep].fields.map((f) => (
                    <div key={f.name} className="ff">
                      <label className="fl">{f.label}</label>
                      {f.type === "textarea" ? (
                        <textarea
                          className="fta"
                          placeholder={f.ph}
                          value={fData[f.name] || ""}
                          onChange={(e) =>
                            setFData({ ...fData, [f.name]: e.target.value })
                          }
                        />
                      ) : f.type === "select" ? (
                        <select
                          className="fse"
                          value={fData[f.name] || ""}
                          onChange={(e) =>
                            setFData({ ...fData, [f.name]: e.target.value })
                          }
                        >
                          <option value="">Select…</option>
                          {f.opts.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className="fi"
                          type={f.type}
                          placeholder={f.ph}
                          value={fData[f.name] || ""}
                          onChange={(e) =>
                            setFData({ ...fData, [f.name]: e.target.value })
                          }
                        />
                      )}
                    </div>
                  ))}
                  <div className="fnav">
                    {fStep > 0 ? (
                      <button
                        className="bs"
                        onClick={() => setFStep((s) => s - 1)}
                      >
                        ← Back
                      </button>
                    ) : (
                      <div />
                    )}
                    {fStep < FORM_STEPS.length - 1 ? (
                      <button
                        className="bp"
                        onClick={() => setFStep((s) => s + 1)}
                      >
                        Continue →
                      </button>
                    ) : (
                      <button className="bp" onClick={() => setFDone(true)}>
                        Submit Application 🌱
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div
                className="fc"
                style={{ textAlign: "center", padding: "2.4rem" }}
              >
                <div style={{ fontSize: "2.8rem", marginBottom: ".7rem" }}>
                  🌿
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "1.75rem",
                    color: "var(--g)",
                    marginBottom: ".5rem",
                  }}
                >
                  Application Received!
                </div>
                <p
                  style={{
                    color: "var(--el)",
                    fontSize: ".8rem",
                    lineHeight: 1.58,
                    maxWidth: 310,
                    margin: "0 auto 1.4rem",
                  }}
                >
                  Your seed has been planted. Our team will reach out within 7
                  working days.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: ".65rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <button className="bp" onClick={() => go("garden")}>
                    🌱 Start Growing →
                  </button>
                  <button
                    className="bs"
                    onClick={() => {
                      setFDone(false);
                      setFStep(0);
                      setFData({});
                    }}
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMMUNITY */}
      {page === "community" && !selProj && (
        <div className="page">
          <div className="sh">
            <div className="sh-eye">🤝 Growing Together</div>
            <h2 className="sh-title">
              Community <em>Corner</em>
            </h2>
            <p className="sh-sub">
              Real projects by real people — anonymized to protect privacy,
              shared to inspire action.
            </p>
          </div>
          <div className="cc-grid">
            {COMMUNITY.map((proj, i) => (
              <div
                key={proj.id}
                className="cc-card"
                style={{
                  animationDelay: `\${i*.055}s`,
                  animation: "fadeUp .38s ease both",
                }}
                onClick={() => setSelProj(proj)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: ".65rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: ".61rem",
                      fontWeight: 500,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      color: "var(--gl)",
                    }}
                  >
                    📍 {proj.region}
                  </span>
                  <span
                    style={{
                      fontSize: ".61rem",
                      background: "var(--cd)",
                      borderRadius: 9,
                      padding: ".12rem .48rem",
                      color: "var(--el)",
                    }}
                  >
                    Anonymous
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: ".34rem",
                    lineHeight: 1.2,
                  }}
                >
                  {proj.title}
                </div>
                <div
                  style={{
                    fontSize: ".75rem",
                    color: "var(--e)",
                    lineHeight: 1.46,
                    marginBottom: ".68rem",
                  }}
                >
                  {proj.summary}
                </div>
                <div className="tag-row" style={{ marginBottom: ".65rem" }}>
                  {proj.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".35rem",
                    fontSize: ".7rem",
                    color: "var(--g)",
                    fontWeight: 500,
                    borderTop: "1px solid var(--mist)",
                    paddingTop: ".65rem",
                  }}
                >
                  🌱 {proj.impact}
                  <span
                    style={{
                      marginLeft: "auto",
                      color: "var(--gl)",
                      fontSize: ".65rem",
                    }}
                  >
                    Read more →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {page === "community" && selProj && (
        <div className="page" style={{ padding: "2rem 3rem" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", paddingTop: "2rem" }}>
            <button
              className="bs"
              style={{
                marginBottom: "1.3rem",
                display: "inline-flex",
                alignItems: "center",
                gap: ".35rem",
              }}
              onClick={() => setSelProj(null)}
            >
              ← Back
            </button>
            <div
              style={{
                fontSize: ".6rem",
                fontWeight: 500,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--el)",
                marginBottom: ".2rem",
              }}
            >
              📍 {selProj.region} · Anonymous Project
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "2.4rem",
                fontWeight: 300,
                color: "var(--ink)",
                marginBottom: ".55rem",
                lineHeight: 1,
              }}
            >
              {selProj.title}
            </div>
            <div className="tag-row" style={{ marginBottom: "1.3rem" }}>
              {selProj.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            {[
              { lbl: "Project Overview", val: selProj.summary },
              { lbl: "🌱 Measured Impact", val: selProj.impact, big: true },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid var(--mist)",
                  borderRadius: 11,
                  padding: "1.2rem",
                  marginBottom: ".9rem",
                }}
              >
                <div
                  style={{
                    fontSize: ".58rem",
                    fontWeight: 500,
                    letterSpacing: ".17em",
                    textTransform: "uppercase",
                    color: "var(--gl)",
                    marginBottom: ".45rem",
                  }}
                >
                  {s.lbl}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: s.big ? "1.25rem" : ".93rem",
                    color: s.big ? "var(--g)" : "var(--ink)",
                    lineHeight: 1.6,
                  }}
                >
                  {s.val}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: ".65rem", flexWrap: "wrap" }}>
              <button className="bp" onClick={() => go("garden")}>
                🌱 Start Your Own Garden →
              </button>
              <button className="bs" onClick={() => go("startup")}>
                Register Initiative
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FUTURE */}
      {page === "future" && (
        <div className="page">
          <div className="fut-hero">
            <div className="fut-bg" />
            <p
              style={{
                fontFamily: "'DM Sans'",
                fontSize: ".64rem",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "rgba(184,205,180,.72)",
                marginBottom: ".65rem",
                position: "relative",
              }}
            >
              🔭 Looking Forward
            </p>
            <div
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(1.85rem,4.2vw,3.6rem)",
                fontWeight: 300,
                color: "var(--c)",
                lineHeight: 1.1,
                position: "relative",
                marginBottom: ".65rem",
              }}
            >
              The{" "}
              <em style={{ color: "var(--gold-l)", fontStyle: "italic" }}>
                Future
              </em>{" "}
              is Already Growing
            </div>
            <p
              style={{
                fontSize: ".86rem",
                color: "rgba(184,205,180,.72)",
                maxWidth: 440,
                position: "relative",
                lineHeight: 1.6,
              }}
            >
              Plants. Gardens. Knowledge. One shared future in botanical
              medicine and global health equity.
            </p>
          </div>
          <div className="met-grid">
            {[
              ["$620B", "Global herbal market by 2030"],
              ["80%", "Humanity relies on plants for primary care"],
              ["50,000+", "Documented medicinal plant species"],
              ["2.5×", "Faster approval for botanical innovations"],
            ].map(([n, l]) => (
              <div key={l} className="met">
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "1.9rem",
                    fontWeight: 600,
                    color: "var(--g)",
                    lineHeight: 1,
                    marginBottom: ".2rem",
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontSize: ".64rem",
                    color: "var(--el)",
                    lineHeight: 1.38,
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{ padding: "2.8rem 3rem", maxWidth: 1080, margin: "0 auto" }}
          >
            <div className="sh-eye">🌍 UN SDG Alignment</div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "1.7rem",
                fontWeight: 300,
                color: "var(--ink)",
                marginBottom: "1.1rem",
              }}
            >
              How Plants Power{" "}
              <em style={{ color: "var(--g)", fontStyle: "italic" }}>
                the SDGs
              </em>
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(208px,1fr)",
                gap: ".78rem",
              }}
            >
              {[
                {
                  n: "03",
                  t: "Good Health",
                  d: "Plant medicines provide equitable healthcare in underserved communities.",
                },
                {
                  n: "02",
                  t: "Zero Hunger",
                  d: "Moringa and nutritional plants combat deficiency for 2 billion people.",
                },
                {
                  n: "15",
                  t: "Life on Land",
                  d: "Conservation preserves biodiversity and restores degraded ecosystems.",
                },
                {
                  n: "08",
                  t: "Decent Work",
                  d: "Botanical startups create rural employment across supply chains.",
                },
                {
                  n: "11",
                  t: "Sustainable Cities",
                  d: "Urban terrace and balcony gardens bring biodiversity to cities.",
                },
                {
                  n: "04",
                  t: "Quality Education",
                  d: "Ethnobotany curricula revive traditional knowledge in schools.",
                },
              ].map((s) => (
                <div
                  key={s.n}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--mist)",
                    borderRadius: 10,
                    padding: ".95rem",
                    display: "flex",
                    gap: ".7rem",
                    alignItems: "flex-start",
                    transition: "all .18s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--gl)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--mist)")
                  }
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      color: "var(--gp)",
                      lineHeight: 1,
                      minWidth: "1.75rem",
                    }}
                  >
                    {s.n}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: ".74rem",
                        fontWeight: 500,
                        color: "var(--ink)",
                        marginBottom: ".13rem",
                      }}
                    >
                      {s.t}
                    </div>
                    <div
                      style={{
                        fontSize: ".66rem",
                        color: "var(--el)",
                        lineHeight: 1.36,
                      }}
                    >
                      {s.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              background: "var(--g)",
              borderRadius: 18,
              padding: "2.6rem 2rem",
              textAlign: "center",
              maxWidth: 1080,
              margin: "0 3rem 5rem",
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "1.9rem",
                fontWeight: 300,
                color: "#fff",
                marginBottom: ".5rem",
              }}
            >
              Grow Your Own Medicine Garden
            </div>
            <div
              style={{
                color: "var(--gp)",
                fontSize: ".8rem",
                marginBottom: "1.3rem",
                maxWidth: 380,
                margin: "0 auto 1.3rem",
                lineHeight: 1.58,
              }}
            >
              Start with a single pot of Tulsi on your balcony. Build to a full
              terrace garden. Join the botanical self-sufficiency movement.
            </div>
            <div
              style={{
                display: "flex",
                gap: ".65rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button className="bg" onClick={() => go("garden")}>
                🌱 Start Your Garden →
              </button>
              <button
                style={{
                  background: "rgba(255,255,255,.14)",
                  border: "1px solid rgba(255,255,255,.28)",
                  color: "#fff",
                  borderRadius: 26,
                  padding: ".66rem 1.4rem",
                  cursor: "pointer",
                  fontSize: ".74rem",
                  fontWeight: 500,
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "all .2s",
                }}
                onClick={() => go("startup")}
              >
                Register Initiative
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
