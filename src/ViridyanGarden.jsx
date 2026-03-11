import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

// ─── PLANT DATABASE ───────────────────────────────────────────────────────────
const PLANT_DATA = [
  { id:1,  name:"Ashwagandha",   scientific:"Withania somnifera",        category:"Adaptogen",          rarity:"Common",   flowerColor:"#FFD700", leafColor:"#33cc44", barkColor:"#8B5E3C", description:"The ancient Indian Ginseng — cornerstone of Ayurvedic medicine for 3,000 years.", uses:["Stress relief","Immune boost","Anti-inflammatory","Cognitive enhancement"], origin:"India, North Africa", era:"3000 BCE", compound:"Withanolides", modern:"Nootropics, anxiety research, adaptogen formulas" },
  { id:2,  name:"Turmeric",      scientific:"Curcuma longa",             category:"Spice & Medicine",   rarity:"Common",   flowerColor:"#FF6D00", leafColor:"#2db84d", barkColor:"#7a5c00", description:"The golden spice healing bodies across Asia for millennia.", uses:["Antioxidant","Anti-inflammatory","Digestive health","Wound healing"], origin:"South Asia", era:"2500 BCE", compound:"Curcumin", modern:"Anti-inflammatories, cancer research, functional foods" },
  { id:3,  name:"Neem",          scientific:"Azadirachta indica",        category:"Multipurpose Tree",  rarity:"Common",   flowerColor:"#e8f5b0", leafColor:"#22aa33", barkColor:"#6D4C41", description:"The Village Pharmacy — every part of Neem has medicinal value.", uses:["Antibacterial","Antifungal","Pest repellent","Oral health"], origin:"Indian subcontinent", era:"4500 BCE", compound:"Azadirachtin", modern:"Biopesticides, oral care, dermatology" },
  { id:4,  name:"Holy Basil",    scientific:"Ocimum tenuiflorum",        category:"Sacred Herb",        rarity:"Common",   flowerColor:"#CE93D8", leafColor:"#44dd55", barkColor:"#4a7a40", description:"Tulsi — sacred in Hinduism, revered as the Queen of Herbs.", uses:["Respiratory health","Stress relief","Antimicrobial","Blood sugar"], origin:"India", era:"5000 BCE", compound:"Eugenol, Ursolic acid", modern:"Herbal teas, adaptogen supplements" },
  { id:5,  name:"Saffron",       scientific:"Crocus sativus",            category:"Precious Spice",     rarity:"Rare",     flowerColor:"#d050ff", leafColor:"#7dc455", barkColor:"#9C7C38", description:"More precious than gold — saffron's crimson threads healed civilizations.", uses:["Antidepressant","Antioxidant","Memory boost","PMS relief"], origin:"Iran, Greece", era:"1500 BCE", compound:"Crocin, Safranal", modern:"Depression trials, Alzheimer's research" },
  { id:6,  name:"Brahmi",        scientific:"Bacopa monnieri",           category:"Nootropic",          rarity:"Uncommon", flowerColor:"#40C4FF", leafColor:"#55ddaa", barkColor:"#2ea090", description:"Named after Brahma — enhances the mind's creative and cognitive powers.", uses:["Memory boost","Anxiety reduction","Neuroprotection","ADHD"], origin:"India, Sri Lanka", era:"6th c. CE", compound:"Bacosides", modern:"Nootropic stacks, cognitive support" },
  { id:7,  name:"Aloe Vera",     scientific:"Aloe barbadensis",          category:"Succulent Healer",   rarity:"Common",   flowerColor:"#FF6E40", leafColor:"#99cc44", barkColor:"#6a9a30", description:"The Plant of Immortality — used by Egyptian queens and modern dermatologists.", uses:["Skin healing","Burns","Digestive aid","Anti-aging"], origin:"Arabian Peninsula", era:"2100 BCE", compound:"Aloin, Acemannan", modern:"Cosmetics, wound care, IBS treatment" },
  { id:8,  name:"Ginger",        scientific:"Zingiber officinale",       category:"Rhizome Medicine",   rarity:"Common",   flowerColor:"#FF9100", leafColor:"#33bb44", barkColor:"#8B6914", description:"The universal spice — warming roots that soothed stomachs across 5,000 years.", uses:["Nausea relief","Anti-inflammatory","Digestion","Immunity"], origin:"Southeast Asia", era:"3000 BCE", compound:"Gingerols, Shogaols", modern:"Chemotherapy nausea, arthritis, functional foods" },
  { id:9,  name:"Giloy",         scientific:"Tinospora cordifolia",      category:"Climber Vine",       rarity:"Uncommon", flowerColor:"#aaff88", leafColor:"#44cc66", barkColor:"#4a8a40", description:"The divine nectar — heart-leaved moonseed climbs to immune supremacy.", uses:["Fever","Immunity","Dengue management","Liver health"], origin:"India", era:"2000 BCE", compound:"Tinosporin", modern:"Immune modulators, COVID research" },
  { id:10, name:"Sandalwood",    scientific:"Santalum album",            category:"Aromatic Tree",      rarity:"Rare",     flowerColor:"#FFD740", leafColor:"#33cc55", barkColor:"#9E8060", description:"Sacred wood whose fragrance transcends temples and laboratories alike.", uses:["Anxiety","Skin inflammation","Antibacterial","Urinary tract"], origin:"India, Australia", era:"4000 BCE", compound:"Santalol", modern:"Aromatherapy, cosmetics, antiseptics" },
  { id:11, name:"Peppermint",    scientific:"Mentha piperita",           category:"Mint Family",        rarity:"Common",   flowerColor:"#84FFFF", leafColor:"#11cc99", barkColor:"#008866", description:"Cool breath of the garden — mint's menthol is nature's analgesic.", uses:["Headache","IBS","Nausea","Mental focus"], origin:"Europe, Middle East", era:"1000 BCE", compound:"Menthol", modern:"IBS treatment, topical analgesics, aromatherapy" },
  { id:12, name:"Chamomile",     scientific:"Matricaria chamomilla",     category:"Daisy Family",       rarity:"Common",   flowerColor:"#ffe066", leafColor:"#88dd44", barkColor:"#6a8a30", description:"The gentle giant of herbal teas — calming both infants and elders for centuries.", uses:["Sleep aid","Anxiety","Anti-inflammatory","Digestive"], origin:"Europe, West Asia", era:"1550 BCE", compound:"Apigenin", modern:"Sleep supplements, skin creams, mouthwash" },
  { id:13, name:"Lavender",      scientific:"Lavandula angustifolia",    category:"Aromatic Shrub",     rarity:"Common",   flowerColor:"#bb88ff", leafColor:"#88cc66", barkColor:"#6a8860", description:"Purple fields of calm — lavender's scent has quieted anxiety for millennia.", uses:["Anxiety","Insomnia","Burn healing","Antifungal"], origin:"Mediterranean", era:"2500 BCE", compound:"Linalool", modern:"Aromatherapy, anxiety supplements, cosmetics" },
  { id:14, name:"Echinacea",     scientific:"Echinacea purpurea",        category:"Prairie Flower",     rarity:"Uncommon", flowerColor:"#ff4499", leafColor:"#55bb44", barkColor:"#6D5030", description:"The Native American purple coneflower — guardian of the immune system.", uses:["Cold prevention","Immune boost","Anti-viral","Wound healing"], origin:"North America", era:"400 years ago", compound:"Echinacosides", modern:"Cold remedies, immune supplements" },
  { id:15, name:"Valerian",      scientific:"Valeriana officinalis",     category:"Sedative Herb",      rarity:"Uncommon", flowerColor:"#ff88bb", leafColor:"#77cc55", barkColor:"#8a7050", description:"The sleep herb of ancient Greece — Hippocrates prescribed its fragrant roots.", uses:["Insomnia","Anxiety","Blood pressure","Menstrual pain"], origin:"Europe, Asia", era:"200 BCE", compound:"Valerenic acid", modern:"Sleep aids, anxiety supplements" },
  { id:16, name:"Moringa",       scientific:"Moringa oleifera",          category:"Miracle Tree",       rarity:"Uncommon", flowerColor:"#fff4aa", leafColor:"#33dd44", barkColor:"#9a8060", description:"The Miracle Tree — every part edible, every part medicinal.", uses:["Malnutrition","Anti-inflammatory","Antioxidant","Blood sugar"], origin:"India, Africa", era:"2000 BCE", compound:"Isothiocyanates", modern:"Superfood supplements, malnutrition programs" },
  { id:17, name:"Cardamom",      scientific:"Elettaria cardamomum",      category:"Aromatic Spice",     rarity:"Uncommon", flowerColor:"#ffaacc", leafColor:"#33bb66", barkColor:"#5D4037", description:"Queen of Spices — the green pods of cardamom perfume both kitchens and medicine.", uses:["Digestive","Oral health","Antioxidant","Blood pressure"], origin:"India, Guatemala", era:"4000 BCE", compound:"Cineole", modern:"Oral care, digestive aids, cosmetics" },
  { id:18, name:"Fenugreek",     scientific:"Trigonella foenum-graecum", category:"Seed Medicine",      rarity:"Common",   flowerColor:"#ffffaa", leafColor:"#88cc44", barkColor:"#7a7040", description:"Ancient Greek fodder plant that became one of Ayurveda's most powerful seeds.", uses:["Diabetes","Breast milk","Testosterone","Digestion"], origin:"Mediterranean, India", era:"4000 BCE", compound:"Diosgenin", modern:"Diabetes management, testosterone boosters" },
  { id:19, name:"Black Seed",    scientific:"Nigella sativa",            category:"Prophetic Medicine", rarity:"Uncommon", flowerColor:"#88aaff", leafColor:"#aad944", barkColor:"#5D4030", description:"A cure for everything except death — revered and proven by science.", uses:["Immunity","Asthma","Diabetes","Anti-cancer"], origin:"Middle East, Mediterranean", era:"3300 BCE", compound:"Thymoquinone", modern:"Oncology research, immune modulators" },
  { id:20, name:"Guduchi",       scientific:"Tinospora sinensis",        category:"Climbing Herb",      rarity:"Uncommon", flowerColor:"#aaffcc", leafColor:"#44cc77", barkColor:"#3a8840", description:"The heavenly elixir — celestial vine that guards against disease and aging.", uses:["Immunity","Fever","Gout","Jaundice"], origin:"India, China", era:"1500 BCE", compound:"Berberine", modern:"Immune tonics, anti-aging research" },
  { id:21, name:"Amla",          scientific:"Phyllanthus emblica",       category:"Vitamin C Tree",     rarity:"Common",   flowerColor:"#ccffaa", leafColor:"#55cc33", barkColor:"#8a7050", description:"The Indian Gooseberry — highest Vitamin C concentration of any fruit.", uses:["Vitamin C source","Hair health","Liver","Antioxidant"], origin:"India, Southeast Asia", era:"3000 BCE", compound:"Ellagic acid", modern:"Cosmetics, hair oils, chyawanprash" },
  { id:22, name:"Shankhpushpi",  scientific:"Convolvulus pluricaulis",   category:"Brain Tonic",        rarity:"Uncommon", flowerColor:"#80d8ff", leafColor:"#55ddcc", barkColor:"#2ab0b0", description:"The conch flower — ancient memory tonic whose blue blooms sharpen the mind.", uses:["Memory","Epilepsy","Hypertension","Thyroid"], origin:"India", era:"2000 BCE", compound:"Shankhpushpine", modern:"Cognitive supplements, epilepsy research" },
  { id:23, name:"Vetiver",       scientific:"Chrysopogon zizanioides",   category:"Aromatic Grass",     rarity:"Uncommon", flowerColor:"#ccddaa", leafColor:"#44aa22", barkColor:"#4a4020", description:"The Oil of Tranquility — vetiver's deep roots cool both soil and minds.", uses:["Anxiety","Soil erosion","ADHD","Fever"], origin:"India", era:"3000 BCE", compound:"Khusimol", modern:"Aromatherapy, ADHD, perfumery" },
  { id:24, name:"Arjuna",        scientific:"Terminalia arjuna",         category:"Heart Tree",         rarity:"Rare",     flowerColor:"#FFD740", leafColor:"#33cc44", barkColor:"#7a6040", description:"The warrior tree named after Arjuna — guardian of the human heart.", uses:["Heart disease","Blood pressure","Angina","Antioxidant"], origin:"India", era:"2500 BCE", compound:"Arjunolic acid", modern:"Cardiac supplements, antihypertensives" },
  { id:25, name:"Garcinia",      scientific:"Garcinia cambogia",         category:"Tropical Fruit",     rarity:"Rare",     flowerColor:"#FFAB40", leafColor:"#229944", barkColor:"#5D4020", description:"The Malabar tamarind — sour fruit that sweet-talks metabolism.", uses:["Weight loss","Cholesterol","Appetite suppression","Diabetes"], origin:"India, Southeast Asia", era:"Middle Ages", compound:"HCA", modern:"Weight loss supplements, metabolic research" },
  { id:26, name:"Rosemary",      scientific:"Salvia rosmarinus",         category:"Mediterranean Herb", rarity:"Common",   flowerColor:"#88ccff", leafColor:"#44bb66", barkColor:"#8a8060", description:"Dew of the sea — Mediterranean shrub that sharpens memory and crowns victors.", uses:["Memory","Hair growth","Antioxidant","Anti-inflammatory"], origin:"Mediterranean", era:"500 BCE", compound:"Rosmarinic acid", modern:"Hair loss treatment, Alzheimer's research" },
  { id:27, name:"Milk Thistle",  scientific:"Silybum marianum",          category:"Liver Guardian",     rarity:"Uncommon", flowerColor:"#dd55ff", leafColor:"#66cc44", barkColor:"#6D5030", description:"The spiny protector — milk thistle's seeds shield the liver like armor.", uses:["Liver disease","Cirrhosis","Diabetes","Gallbladder"], origin:"Mediterranean, Middle East", era:"40 CE", compound:"Silymarin", modern:"Hepatoprotectives, cirrhosis treatment" },
  { id:28, name:"Andrographis",  scientific:"Andrographis paniculata",   category:"King of Bitters",    rarity:"Uncommon", flowerColor:"#88ffee", leafColor:"#22bb88", barkColor:"#4a4030", description:"King of Bitters — the most bitter plant in Asia is also one of the most healing.", uses:["Fever","Cold","Liver","Immune boost"], origin:"India, Sri Lanka", era:"1000 CE", compound:"Andrographolide", modern:"COVID research, immune supplements" },
  { id:29, name:"Triphala",      scientific:"Three-fruit formula",       category:"Ayurvedic Formula",  rarity:"Rare",     flowerColor:"#ffdd44", leafColor:"#44cc55", barkColor:"#7a6040", description:"The three-fruit trinity — Amalaki, Bibhitaki, Haritaki — Ayurveda's master formula.", uses:["Digestion","Detox","Eye health","Anti-aging"], origin:"India", era:"5000 BCE", compound:"Tannins, Chebulinic acid", modern:"Gut health products, detox supplements" },
  { id:30, name:"Kalmegh",       scientific:"Andrographis paniculata",   category:"Bitter Tonic",       rarity:"Uncommon", flowerColor:"#66ffaa", leafColor:"#33bb44", barkColor:"#4a7040", description:"Green chiretta — the bitter tonic that clears fever and fortifies the immune system.", uses:["Malaria","Liver","Antibacterial","Fever"], origin:"India, Southeast Asia", era:"1000 BCE", compound:"Andrographolide", modern:"Malaria alternatives, hepatoprotectives" },
];

const POSITIONS = [
  [-8,0,-5],  [-9,0,-9],  [9,0,-6],   [-8,0,-13], [8,0,-14],
  [-12,0,-12],[12,0,-10], [-9,0,-18], [13,0,-21], [11,0,-18],
  [-15,0,-5], [15,0,-5],  [-14,0,-16],[14,0,-16], [-9,0,-24],
  [9,0,-22],  [-11,0,-22],[18,0,-12], [-18,0,-12],[-9,0,-28],
  [9,0,-28],  [-9,0,-31], [13,0,-26], [-13,0,-26],[20,0,-20],
  [-20,0,-20],[16,0,-28], [-16,0,-28],[8,0,-36],  [20,0,-6],
];
const PLANTS = PLANT_DATA.map((p,i) => ({ ...p, position: POSITIONS[i] }));

// ─── TACTICAL SOLDIER CHARACTER ───────────────────────────────────────────────
function buildSoldier(scene) {
  const root = new THREE.Group();

  // Materials — sandy tan armor like the reference
  const tan     = new THREE.MeshLambertMaterial({ color: 0xC8A96E });
  const darkTan = new THREE.MeshLambertMaterial({ color: 0xA08048 });
  const deepTan = new THREE.MeshLambertMaterial({ color: 0x7A6035 });
  const darkGrey= new THREE.MeshLambertMaterial({ color: 0x2a2a2a });
  const midGrey = new THREE.MeshLambertMaterial({ color: 0x4a4a4a });
  const red     = new THREE.MeshLambertMaterial({ color: 0xdd1111 });
  const visor   = new THREE.MeshLambertMaterial({ color: 0x111111, transparent:true, opacity:0.88 });
  const dark    = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
  const straps  = new THREE.MeshLambertMaterial({ color: 0x556644 });

  // ── LOWER BODY (pelvis / hip block)
  const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.46,0.22,0.3), darkTan);
  pelvis.position.y = 0.66; root.add(pelvis);

  // Belt with pouches
  const belt = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.07,0.32), midGrey);
  belt.position.y = 0.74; root.add(belt);
  for(let i=-1;i<=1;i+=2){
    const pouch = new THREE.Mesh(new THREE.BoxGeometry(0.1,0.1,0.08), straps);
    pouch.position.set(i*0.22, 0.70, 0.16); root.add(pouch);
  }

  // ── TORSO (chest + back plates)
  const torsoGroup = new THREE.Group();
  torsoGroup.position.y = 0.98;

  // Main chest block
  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.52,0.44,0.32), tan);
  chest.castShadow=true; torsoGroup.add(chest);

  // Chest armor plates (layered)
  const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(0.38,0.28,0.06), darkTan);
  chestPlate.position.set(0,0.04,0.17); torsoGroup.add(chestPlate);

  // Chest stripe (red cross mark like ref)
  const stripe1 = new THREE.Mesh(new THREE.BoxGeometry(0.06,0.22,0.04), red);
  stripe1.position.set(0.12,0.04,0.22); torsoGroup.add(stripe1);
  const stripe2 = new THREE.Mesh(new THREE.BoxGeometry(0.06,0.22,0.04), red);
  stripe2.position.set(-0.12,0.04,0.22); torsoGroup.add(stripe2);

  // Side strap equipment
  const sideGear = new THREE.Mesh(new THREE.BoxGeometry(0.08,0.3,0.28), straps);
  sideGear.position.set(0.28,0,0); torsoGroup.add(sideGear);
  const sideGearR = new THREE.Mesh(new THREE.BoxGeometry(0.08,0.3,0.28), straps);
  sideGearR.position.set(-0.28,0,0); torsoGroup.add(sideGearR);

  // Back plate
  const backPlate = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.4,0.06), deepTan);
  backPlate.position.set(0,0,-0.17); torsoGroup.add(backPlate);

  // Backpack
  const pack = new THREE.Mesh(new THREE.BoxGeometry(0.3,0.35,0.14), midGrey);
  pack.position.set(0,0,-0.24); torsoGroup.add(pack);

  root.add(torsoGroup);

  // ── SHOULDERS (pauldrons — thick angled pads)
  [-1,1].forEach(s => {
    const shGrp = new THREE.Group();
    shGrp.position.set(s*0.32, 1.12, 0);
    shGrp.userData.isShoulder = true;

    const pauldron = new THREE.Mesh(new THREE.BoxGeometry(0.18,0.16,0.26), tan);
    pauldron.position.set(s*0.08,0,0); shGrp.add(pauldron);
    const padBot = new THREE.Mesh(new THREE.BoxGeometry(0.15,0.06,0.28), darkTan);
    padBot.position.set(s*0.08,-0.1,0); shGrp.add(padBot);

    root.add(shGrp);
  });

  // ── UPPER ARMS
  [-1,1].forEach(s => {
    const armGrp = new THREE.Group();
    armGrp.position.set(s*0.44, 1.02, 0);
    armGrp.userData.isArm = true;
    armGrp.userData.side = s;

    const ua = new THREE.Mesh(new THREE.CylinderGeometry(0.075,0.085,0.36,8), tan);
    ua.position.y=-0.18; armGrp.add(ua);

    // Elbow pad
    const ep = new THREE.Mesh(new THREE.BoxGeometry(0.14,0.1,0.14), darkTan);
    ep.position.y=-0.38; armGrp.add(ep);

    // Forearm
    const faGrp = new THREE.Group();
    faGrp.position.y=-0.42;
    faGrp.userData.isForearm = true;

    const fa = new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.072,0.34,8), darkTan);
    fa.position.y=-0.17; faGrp.add(fa);

    // Wrist gauntlet
    const gauntlet = new THREE.Mesh(new THREE.BoxGeometry(0.13,0.1,0.13), deepTan);
    gauntlet.position.y=-0.36; faGrp.add(gauntlet);

    // Hand — claw-like fingers
    const handGrp = new THREE.Group();
    handGrp.position.y=-0.43;
    const palm = new THREE.Mesh(new THREE.BoxGeometry(0.1,0.09,0.08), tan);
    handGrp.add(palm);
    for(let f=0;f<4;f++){
      const fng = new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.015,0.07,5), tan);
      fng.position.set(-0.035+f*0.024,-0.07,0.04); fng.rotation.x=0.3; handGrp.add(fng);
    }
    faGrp.add(handGrp);
    armGrp.add(faGrp);
    root.add(armGrp);
  });

  // ── NECK
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.1,0.14,8), darkTan);
  neck.position.y = 1.26; root.add(neck);

  // ── HEAD with tactical helmet
  const headGrp = new THREE.Group();
  headGrp.position.y = 1.44;
  headGrp.userData.isHead = true;

  // Helmet base (rounded box)
  const helmetBase = new THREE.Mesh(new THREE.BoxGeometry(0.36,0.3,0.38), tan);
  helmetBase.castShadow=true; headGrp.add(helmetBase);
  const helmetTop = new THREE.Mesh(new THREE.SphereGeometry(0.22,10,8,0,Math.PI*2,0,Math.PI*0.55), tan);
  helmetTop.position.y=0.1; headGrp.add(helmetTop);

  // Visor/mask (dark lower face)
  const mask = new THREE.Mesh(new THREE.BoxGeometry(0.34,0.14,0.1), dark);
  mask.position.set(0,-0.06,0.2); headGrp.add(mask);

  // Visor lens (slightly raised)
  const lens = new THREE.Mesh(new THREE.BoxGeometry(0.28,0.1,0.05), visor);
  lens.position.set(0,-0.04,0.26); headGrp.add(lens);

  // Lens glow
  const lensGlow = new THREE.PointLight(0x330000, 0.5, 0.8);
  lensGlow.position.set(0,-0.04,0.3); headGrp.add(lensGlow);

  // Helmet ear/side guards
  [-1,1].forEach(s=>{
    const eGuard = new THREE.Mesh(new THREE.BoxGeometry(0.06,0.22,0.3), darkTan);
    eGuard.position.set(s*0.2,-0.02,0); headGrp.add(eGuard);
  });

  // Helmet ridge (top center stripe)
  const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.04,0.06,0.36), midGrey);
  ridge.position.y=0.19; headGrp.add(ridge);

  // Red accent stripe on helmet (like reference)
  const hStripe = new THREE.Mesh(new THREE.BoxGeometry(0.04,0.05,0.38), red);
  hStripe.position.set(0.1,0.12,0); headGrp.add(hStripe);

  root.add(headGrp);

  // ── LEGS
  [-1,1].forEach(s=>{
    const legGrp = new THREE.Group();
    legGrp.position.set(s*0.13, 0.64, 0);
    legGrp.userData.isLeg = true;
    legGrp.userData.side = s;

    // Upper thigh
    const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.095,0.105,0.38,8), tan);
    thigh.position.y=-0.19; thigh.castShadow=true; legGrp.add(thigh);

    // Knee guard
    const knee = new THREE.Mesh(new THREE.BoxGeometry(0.18,0.12,0.18), darkTan);
    knee.position.y=-0.42; legGrp.add(knee);

    // Shin armor
    const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.075,0.09,0.36,8), tan);
    shin.position.y=-0.62; legGrp.add(shin);

    // Shin front plate
    const shinPlate = new THREE.Mesh(new THREE.BoxGeometry(0.13,0.28,0.06), darkTan);
    shinPlate.position.set(0,-0.62,0.09); legGrp.add(shinPlate);

    // Ankle
    const ankle = new THREE.Mesh(new THREE.BoxGeometry(0.14,0.1,0.14), deepTan);
    ankle.position.y=-0.84; legGrp.add(ankle);

    // Boot
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.16,0.1,0.3), dark);
    boot.position.set(0,-0.93,0.06); legGrp.add(boot);
    const bootToe = new THREE.Mesh(new THREE.BoxGeometry(0.14,0.07,0.12), darkGrey);
    bootToe.position.set(0,-0.93,0.22); legGrp.add(bootToe);

    root.add(legGrp);
  });

  // Shadow disc under character
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.45,24),
    new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.3})
  );
  shadow.rotation.x=-Math.PI/2; shadow.position.y=0.01; root.add(shadow);

  scene.add(root);
  return root;
}

// ─── ENHANCED PLANT BUILDERS ──────────────────────────────────────────────────
function mat(color, emissiveMult=0.08, side=THREE.FrontSide) {
  return new THREE.MeshLambertMaterial({
    color, side,
    emissive: new THREE.Color(color).multiplyScalar(emissiveMult)
  });
}

function buildNeem(p, g) {
  const tm=mat(p.barkColor,0.02); const lm=mat(p.leafColor,0.12,THREE.DoubleSide);
  const lm2=mat(p.leafColor.replace('aa','88').replace('cc','aa'),0.08,THREE.DoubleSide);
  // Multi-segment tapered trunk
  for(let i=0;i<7;i++){
    const r=0.22-i*0.025; const s=new THREE.Mesh(new THREE.CylinderGeometry(r*0.82,r,0.78,10),tm);
    s.position.y=i*0.76+0.39; s.castShadow=true; g.add(s);
  }
  // Root buttresses
  for(let r=0;r<5;r++){
    const a=(r/5)*Math.PI*2;
    const root=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.4,0.12),tm);
    root.position.set(Math.sin(a)*0.24,0.2,Math.cos(a)*0.24); root.rotation.y=a; root.rotation.x=0.4; g.add(root);
  }
  // Multiple canopy layers with different sizes
  const canopyDef=[[0,4.5,2.2],[0.6,4.0,1.8],[-0.6,3.8,1.9],[0.3,5.0,1.5],[-0.4,4.8,1.6],[0,3.4,1.4]];
  canopyDef.forEach(([rx,y,r])=>{
    const lmat=Math.random()>0.5?lm:lm2;
    const cl=new THREE.Mesh(new THREE.SphereGeometry(r,9,7,0,Math.PI*2,0,Math.PI*0.65),lmat);
    cl.position.set(Math.sin(rx)*1.0,y,Math.cos(rx)*0.8); cl.castShadow=true; g.add(cl);
  });
  // Individual branch clusters
  for(let b=0;b<9;b++){
    const a=(b/9)*Math.PI*2;
    const bm=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.05,1.4,6),tm);
    bm.position.set(Math.sin(a)*0.9,3.5+Math.random()*0.8,Math.cos(a)*0.9);
    bm.rotation.z=Math.sin(a)*0.7; bm.rotation.x=Math.cos(a)*0.45; g.add(bm);
    const leafClump=new THREE.Mesh(new THREE.SphereGeometry(0.5+Math.random()*0.3,7,6),lm);
    leafClump.position.set(Math.sin(a)*1.6,3.8+Math.random()*0.6,Math.cos(a)*1.6); g.add(leafClump);
  }
}

function buildAloe(p, g) {
  const lm=mat(p.leafColor,0.12,THREE.DoubleSide);
  const fm=mat(p.flowerColor,0.3); const sm=mat('#88cc44',0.1);
  const spM=mat('#ccff88',0.05);
  for(let ring=0;ring<4;ring++){
    const cnt=4+ring*3, rr=0.08+ring*0.36, len=0.6+ring*0.6;
    for(let i=0;i<cnt;i++){
      const a=(i/cnt)*Math.PI*2+ring*0.35;
      const sh=new THREE.Shape();
      sh.moveTo(0,0); sh.lineTo(0.09,0.2); sh.lineTo(0.06,len*0.4); sh.lineTo(0.03,len);
      sh.lineTo(0,len+0.08); sh.lineTo(-0.03,len); sh.lineTo(-0.06,len*0.4); sh.lineTo(-0.09,0.2); sh.lineTo(0,0);
      const leaf=new THREE.Mesh(new THREE.ShapeGeometry(sh,10),lm);
      leaf.position.set(Math.sin(a)*rr,0.04,Math.cos(a)*rr);
      leaf.rotation.y=a; leaf.rotation.x=0.32+ring*0.12; leaf.castShadow=true; g.add(leaf);
      // Spine teeth on outer rings
      if(ring>=2){
        for(let sp=2;sp<8;sp++){
          const spine=new THREE.Mesh(new THREE.ConeGeometry(0.007,0.09,4),spM);
          spine.position.set(Math.sin(a)*(rr+0.06),sp*len/8,Math.cos(a)*(rr+0.06)); g.add(spine);
        }
      }
    }
  }
  // Tall flower spike with multiple buds
  const spike=new THREE.Mesh(new THREE.CylinderGeometry(0.018,0.028,1.9,7),sm); spike.position.y=1.1; g.add(spike);
  for(let f=0;f<14;f++){
    const bud=new THREE.Mesh(new THREE.SphereGeometry(0.04+Math.sin(f)*0.01,6,6),fm);
    bud.position.set(Math.sin(f*0.9)*0.08,1.25+f*0.1,Math.cos(f*0.9)*0.08); g.add(bud);
  }
}

function buildSaffron(p, g) {
  const lm=mat(p.leafColor,0.05,THREE.DoubleSide);
  const pm=mat(p.flowerColor,0.25,THREE.DoubleSide);
  const stM=mat('#FF1744',0.3); const ctrM=mat('#FFD700',0.35);
  // Thin blade leaves
  for(let l=0;l<8;l++){
    const a=(l/8)*Math.PI*2;
    const sh=new THREE.Shape(); sh.moveTo(0,0); sh.lineTo(0.012,0.5); sh.lineTo(0,1.3); sh.lineTo(-0.012,0.5); sh.lineTo(0,0);
    const lf=new THREE.Mesh(new THREE.ShapeGeometry(sh),lm);
    lf.position.set(Math.sin(a)*0.06,0,Math.cos(a)*0.06); lf.rotation.y=a; g.add(lf);
  }
  // 6 large cupped petals
  for(let pt=0;pt<6;pt++){
    const a=(pt/6)*Math.PI*2;
    const sh=new THREE.Shape();
    sh.moveTo(0,0); sh.bezierCurveTo(0.16,0.15,0.22,0.5,0.09,0.9); sh.bezierCurveTo(0.03,1.0,0,0.95,-0.03,0.9); sh.bezierCurveTo(-0.22,0.5,-0.16,0.15,0,0);
    const geo=new THREE.ShapeGeometry(sh,12);
    const pet=new THREE.Mesh(geo,pm);
    pet.position.set(Math.sin(a)*0.08,0.42,Math.cos(a)*0.08); pet.rotation.y=a; pet.rotation.x=-0.45; g.add(pet);
  }
  // Long red stamens
  for(let s=0;s<3;s++){
    const a=(s/3)*Math.PI*2;
    const st=new THREE.Mesh(new THREE.CylinderGeometry(0.008,0.008,0.65,5),stM);
    st.position.set(Math.sin(a)*0.025,0.85,Math.cos(a)*0.025); g.add(st);
    const tip=new THREE.Mesh(new THREE.SphereGeometry(0.02,5,5),ctrM);
    tip.position.set(Math.sin(a)*0.025,1.18,Math.cos(a)*0.025); g.add(tip);
  }
}

function buildBrahmi(p, g) {
  const lm=mat(p.leafColor,0.15,THREE.DoubleSide);
  const fm=mat(p.flowerColor,0.35);
  const stM=mat(p.barkColor,0.05);
  for(let stem=0;stem<12;stem++){
    const a=(stem/12)*Math.PI*2, len=0.45+Math.random()*0.5;
    // Stem tubes
    const pts=[];
    for(let i=0;i<=8;i++){
      const t=i/8;
      pts.push(new THREE.Vector3(Math.sin(a+t*0.4)*len*t,t*0.22+Math.sin(t*Math.PI)*0.12,Math.cos(a+t*0.3)*len*t));
    }
    g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),8,0.008,5,false),stM));
    for(let seg=0;seg<7;seg++){
      const t=seg/7, x=Math.sin(a+t*0.4)*len*t, z=Math.cos(a+t*0.3)*len*t, y=t*0.22+Math.sin(t*Math.PI)*0.12;
      const lf=new THREE.Mesh(new THREE.CircleGeometry(0.07+Math.random()*0.04,9),lm);
      lf.position.set(x,y,z); lf.rotation.x=-Math.PI/2+Math.random()*0.3; lf.rotation.z=Math.random()*Math.PI; g.add(lf);
    }
    const fl=new THREE.Mesh(new THREE.SphereGeometry(0.05,7,7),fm);
    fl.position.set(Math.sin(a)*len,0.2,Math.cos(a)*len); g.add(fl);
  }
}

function buildLavender(p, g) {
  const sm=mat(p.barkColor,0.02);
  const lm=mat(p.leafColor,0.1,THREE.DoubleSide);
  const fm=mat(p.flowerColor,0.3);
  for(let s=0;s<20;s++){
    const a=(s/20)*Math.PI*2+Math.random()*0.15, sp=0.1+Math.random()*0.28, h=0.5+Math.random()*0.3;
    const pts=[];
    for(let i=0;i<=6;i++){ const t=i/6; pts.push(new THREE.Vector3(Math.sin(a)*sp+Math.sin(t)*0.02,t*h,Math.cos(a)*sp+Math.cos(t)*0.02)); }
    g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),6,0.007,5,false),sm));
    for(let l=0;l<4;l++){
      const sh=new THREE.Shape(); sh.moveTo(0,0); sh.lineTo(0.015,0.08); sh.lineTo(0,0.2); sh.lineTo(-0.015,0.08); sh.lineTo(0,0);
      const lf=new THREE.Mesh(new THREE.ShapeGeometry(sh),lm);
      lf.position.set(Math.sin(a)*sp,0.07+l*0.12,Math.cos(a)*sp); lf.rotation.y=a+l*0.6; lf.rotation.x=-0.15; g.add(lf);
    }
    for(let f=0;f<11;f++){
      const bd=new THREE.Mesh(new THREE.SphereGeometry(0.015+Math.random()*0.008,5,5),fm);
      bd.position.set(Math.sin(a)*sp+Math.sin(f*0.9)*0.015,h+f*0.036,Math.cos(a)*sp+Math.cos(f*0.9)*0.015); g.add(bd);
    }
  }
}

function buildMoringa(p, g) {
  const tm=mat(p.barkColor,0.02); const lm=mat(p.leafColor,0.12,THREE.DoubleSide);
  const fm=mat(p.flowerColor,0.2);
  for(let i=0;i<8;i++){
    const r=0.14-i*0.014;
    const s=new THREE.Mesh(new THREE.CylinderGeometry(r*0.82,r,0.62,9),tm); s.position.y=i*0.60+0.31; g.add(s);
  }
  for(let b=0;b<10;b++){
    const a=(b/10)*Math.PI*2, bh=1.7+Math.random()*1.8, bl=1.0+Math.random()*0.8;
    const br=new THREE.Mesh(new THREE.CylinderGeometry(0.016,0.034,bl,7),tm);
    br.position.set(Math.sin(a)*0.32,bh,Math.cos(a)*0.32); br.rotation.z=Math.sin(a)*0.85; br.rotation.x=Math.cos(a)*0.48; g.add(br);
    // Pinnate leaflets along branch — clustered
    for(let l=0;l<10;l++){
      const t=l/10, ang=a+t*(bl*0.6);
      const lf=new THREE.Mesh(new THREE.SphereGeometry(0.06+Math.random()*0.02,6,5),lm);
      lf.position.set(Math.sin(ang)*(0.32+t*bl*0.7),bh+t*bl*Math.abs(Math.sin(Math.sin(a)*0.85))*0.6,Math.cos(ang)*(0.32+t*bl*0.7));
      lf.scale.set(1.4,0.6,1.4); g.add(lf);
    }
    const fl=new THREE.Mesh(new THREE.SphereGeometry(0.07,7,7),fm);
    fl.position.set(Math.sin(a)*(0.32+bl*0.72),bh+bl*0.4,Math.cos(a)*(0.32+bl*0.72)); g.add(fl);
  }
}

function buildVine(p, g) {
  const vm=mat(p.barkColor,0.03); const lm=mat(p.leafColor,0.12,THREE.DoubleSide);
  const fm=mat(p.flowerColor,0.28); const stumpMat=mat('#7a5530',0.04);

  // Mossy base from v4 style
  const stump=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.25,0.38,9),stumpMat);
  stump.position.y=0.19; g.add(stump);
  const stumpTop=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.2,0.06,9),mat('#5a7a3a',0.12));
  stumpTop.position.y=0.40; g.add(stumpTop);

  // Trellis structure
  const post1=new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.035,3.0,6),vm); post1.position.set(-0.3,1.5,0); g.add(post1);
  const post2=new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.035,3.0,6),vm); post2.position.set(0.3,1.5,0); g.add(post2);
  for(let cr=0;cr<5;cr++){ const cross=new THREE.Mesh(new THREE.CylinderGeometry(0.015,0.015,0.65,5),vm); cross.position.set(0,0.5+cr*0.5,0); cross.rotation.z=Math.PI/2; g.add(cross); }

  // Spiraling upper vine
  const pts=[];
  for(let i=0;i<=55;i++){
    const t=i/55;
    pts.push(new THREE.Vector3(Math.sin(t*Math.PI*6)*(0.15+t*0.35),t*3.0,Math.cos(t*Math.PI*6)*(0.15+t*0.3)));
  }
  const curve=new THREE.CatmullRomCurve3(pts);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve,55,0.018,6,false),vm));

  // Ground sprawling vines from v4 style
  for(let v=0;v<5;v++){
    const a=(v/5)*Math.PI*2 + Math.random()*0.35;
    const reach=0.9+Math.random()*0.95;
    const lowPts=[];
    for(let i=0;i<=11;i++){
      const t=i/11;
      lowPts.push(new THREE.Vector3(
        Math.sin(a+t*0.5)*reach*t + Math.sin(a+t*3)*0.05,
        0.1 + Math.sin(t*Math.PI)*0.28,
        Math.cos(a+t*0.4)*reach*t + Math.cos(a+t*3)*0.05
      ));
    }
    const lowCurve=new THREE.CatmullRomCurve3(lowPts);
    g.add(new THREE.Mesh(new THREE.TubeGeometry(lowCurve,10,0.013,6,false),vm));
    if(v%2===0){
      const tip=lowCurve.getPoint(0.92);
      for(let b=0;b<3;b++){
        const berry=new THREE.Mesh(new THREE.SphereGeometry(0.045+Math.random()*0.02,6,6),fm);
        berry.position.set(tip.x+(Math.random()-0.5)*0.1,tip.y+Math.random()*0.08,tip.z+(Math.random()-0.5)*0.1);
        g.add(berry);
      }
    }
  }

  // Heart-shaped leaves
  for(let l=0;l<18;l++){
    const t=l/18, pt=curve.getPoint(t);
    const sh=new THREE.Shape();
    sh.moveTo(0,0); sh.bezierCurveTo(0.14,0.14,0.22,0.08,0.22,0); sh.bezierCurveTo(0.22,-0.12,0.08,-0.2,0,-0.22); sh.bezierCurveTo(-0.08,-0.2,-0.22,-0.12,-0.22,0); sh.bezierCurveTo(-0.22,0.08,-0.14,0.14,0,0);
    const lf=new THREE.Mesh(new THREE.ShapeGeometry(sh,10),lm);
    lf.position.copy(pt); lf.rotation.y=t*Math.PI*6+Math.random(); lf.rotation.x=-0.35; g.add(lf);
  }
  for(let f=0;f<8;f++){
    const pt=curve.getPoint(0.4+f/14);
    const b=new THREE.Mesh(new THREE.SphereGeometry(0.065,7,7),fm); b.position.copy(pt); g.add(b);
  }
}

function buildGrass(p, g) {
  const bm=mat(p.leafColor,0.1,THREE.DoubleSide); const rm=mat(p.barkColor,0.04);
  for(let b=0;b<32;b++){
    const a=(b/32)*Math.PI*2+Math.random()*0.35, len=0.7+Math.random()*1.1, sp=0.03+Math.random()*0.2;
    const pts=[];
    for(let i=0;i<=10;i++){
      const t=i/10;
      pts.push(new THREE.Vector3(Math.sin(a)*sp*(1+t*2.8)+Math.sin(a+t*2)*0.04,t*len-t*t*len*0.55,Math.cos(a)*sp*(1+t*2.8)));
    }
    const cv=new THREE.CatmullRomCurve3(pts);
    g.add(new THREE.Mesh(new THREE.TubeGeometry(cv,10,0.006+Math.random()*0.004,4,false),bm));
  }
  const rootBall=new THREE.Mesh(new THREE.SphereGeometry(0.12,8,8,0,Math.PI*2,0,Math.PI/2),rm); rootBall.position.y=0; g.add(rootBall);
}

function buildThistle(p, g) {
  const sm=mat(p.barkColor,0.03); const lm=mat('#44bb22',0.12,THREE.DoubleSide);
  const fm=mat(p.flowerColor,0.3); const spM=mat('#aaddaa',0.08);
  const stem=new THREE.Mesh(new THREE.CylinderGeometry(0.032,0.064,1.8,10),sm); stem.position.y=0.9; g.add(stem);
  // Wing-like leaves with veins
  for(let l=0;l<8;l++){
    const a=(l/8)*Math.PI*2, y=0.15+l*0.18;
    const sh=new THREE.Shape(); sh.moveTo(0,0);
    for(let lb=0;lb<8;lb++){ const lt=lb/8; sh.lineTo(Math.sin(lt*Math.PI)*0.24+(lb%2===0?0.08:-0.08),lt*0.6); }
    sh.lineTo(0,0.65); sh.lineTo(-0.06,0.3); sh.lineTo(0,0);
    const lf=new THREE.Mesh(new THREE.ShapeGeometry(sh,8),lm);
    lf.position.set(0,y,0); lf.rotation.y=a; lf.rotation.x=0.4; g.add(lf);
    for(let sp=0;sp<6;sp++){
      const spn=new THREE.Mesh(new THREE.ConeGeometry(0.005,0.12,4),spM);
      spn.position.set(Math.sin(a)*(0.1+sp*0.04),y+sp*0.03,Math.cos(a)*(0.1+sp*0.04));
      spn.rotation.z=Math.sin(a)*1.4; spn.rotation.x=Math.cos(a)*1.0; g.add(spn);
    }
  }
  // Globe flowerhead with inner texture
  const head=new THREE.Mesh(new THREE.SphereGeometry(0.24,12,12),fm); head.position.y=2.0; g.add(head);
  for(let b=0;b<22;b++){
    const a=(b/22)*Math.PI*2;
    const br=new THREE.Mesh(new THREE.ConeGeometry(0.022,0.18,4),spM);
    br.position.set(Math.sin(a)*0.22,1.88,Math.cos(a)*0.22); br.rotation.z=Math.sin(a)*0.85; br.rotation.x=Math.cos(a)*0.85; g.add(br);
  }
  // Inner florets
  for(let f=0;f<8;f++){
    const a=(f/8)*Math.PI*2;
    const flrt=new THREE.Mesh(new THREE.SphereGeometry(0.05,5,5),mat('#ff88dd',0.3));
    flrt.position.set(Math.sin(a)*0.12,2.08,Math.cos(a)*0.12); g.add(flrt);
  }
}

function buildRhizome(p, g) {
  const sm=mat(p.barkColor,0.03); const lm=mat(p.leafColor,0.12,THREE.DoubleSide);
  const fm=mat(p.flowerColor,0.28); const rm=mat('#BCAAA4',0.05);
  // Surface rhizomes — knobby horizontal roots
  for(let r=0;r<5;r++){
    const a=(r/5)*Math.PI*2;
    const pts=[];
    for(let i=0;i<=6;i++){ const t=i/6; pts.push(new THREE.Vector3(Math.sin(a+t*0.4)*(0.15+t*0.25),0.07-t*0.04,Math.cos(a+t*0.3)*(0.15+t*0.25))); }
    g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),6,0.055,7,false),rm));
    // Knob joints
    for(let k=1;k<=3;k++){
      const kt=k/4, kx=Math.sin(a+kt*0.4)*(0.15+kt*0.25), kz=Math.cos(a+kt*0.3)*(0.15+kt*0.25);
      g.add(new THREE.Mesh(new THREE.SphereGeometry(0.065,7,7),rm)).position.set(kx,0.07-kt*0.04,kz);
    }
  }
  // Large paddle leaves with midrib vein
  for(let l=0;l<6;l++){
    const a=(l/6)*Math.PI*2;
    const sh=new THREE.Shape();
    sh.moveTo(0,0); sh.bezierCurveTo(0.16,0.3,0.24,0.85,0.1,1.65); sh.bezierCurveTo(0.04,1.78,-0.04,1.78,-0.1,1.65); sh.bezierCurveTo(-0.24,0.85,-0.16,0.3,0,0);
    const lf=new THREE.Mesh(new THREE.ShapeGeometry(sh,12),lm);
    lf.position.set(Math.sin(a)*0.12,0.06,Math.cos(a)*0.12); lf.rotation.y=a; lf.rotation.x=0.08; lf.castShadow=true; g.add(lf);
    const mr=new THREE.Mesh(new THREE.CylinderGeometry(0.004,0.007,1.5,4),sm);
    mr.position.set(Math.sin(a)*0.12,0.88,Math.cos(a)*0.12); mr.rotation.y=a; mr.rotation.x=0.1; g.add(mr);
  }
  const fs=new THREE.Mesh(new THREE.CylinderGeometry(0.016,0.022,1.1,7),sm); fs.position.y=0.55; g.add(fs);
  for(let pt=0;pt<5;pt++){
    const a=(pt/5)*Math.PI*2;
    const pet=new THREE.Mesh(new THREE.SphereGeometry(0.11,8,8),fm);
    pet.position.set(Math.sin(a)*0.22,1.2,Math.cos(a)*0.22); pet.scale.set(1.2,0.45,1.2); g.add(pet);
  }
  const ctr=new THREE.Mesh(new THREE.SphereGeometry(0.08,7,7),mat('#FFD700',0.4)); ctr.position.y=1.2; g.add(ctr);
}

function buildLargeTree(p, g) {
  const tm=mat(p.barkColor,0.02); const lm=mat(p.leafColor,0.12);
  const lm2=mat(p.leafColor.replace('33','22').replace('cc','aa'),0.08);
  const fm=mat(p.flowerColor,0.28);
  // Thick trunk with bark texture via segments
  for(let i=0;i<10;i++){
    const r=0.2-i*0.016, bumpR=r+Math.sin(i*1.7)*0.015;
    const s=new THREE.Mesh(new THREE.CylinderGeometry(bumpR*0.88,r,0.68,10),tm);
    s.position.y=i*0.66+0.34; s.rotation.y=i*0.2; s.castShadow=true; g.add(s);
  }
  // Root buttresses
  for(let r=0;r<6;r++){
    const a=(r/6)*Math.PI*2;
    const root=new THREE.Mesh(new THREE.BoxGeometry(0.07,0.45,0.1),tm);
    root.position.set(Math.sin(a)*0.28,0.22,Math.cos(a)*0.28); root.rotation.y=a; root.rotation.x=0.35; g.add(root);
  }
  // Recursive branching system
  function branch(ox,oy,oz,rz,rx,ry,len,depth){
    if(depth<1||len<0.1) return;
    const br=new THREE.Mesh(new THREE.CylinderGeometry(len*0.04,len*0.07,len,7),tm);
    br.position.set(ox,oy,oz); br.rotation.z=rz; br.rotation.x=rx; br.rotation.y=ry; g.add(br);
    const nx=ox+Math.sin(rz+rx)*len*0.4, ny=oy+Math.cos(Math.abs(rz))*len*0.78, nz=oz+Math.sin(rx)*len*0.2;
    if(depth>1){
      branch(nx,ny,nz,rz+0.45,rx+0.15,ry+0.3,len*0.7,depth-1);
      branch(nx,ny,nz,rz-0.45,rx-0.15,ry-0.3,len*0.65,depth-1);
      if(depth===3) branch(nx,ny,nz,rz+0.1,rx+0.5,ry+1.2,len*0.6,depth-1);
    }
    if(depth===1){
      const lmat=Math.random()>0.4?lm:lm2;
      const lf=new THREE.Mesh(new THREE.SphereGeometry(0.28+Math.random()*0.12,8,7),lmat);
      lf.position.set(nx,ny+0.12,nz); lf.castShadow=true; g.add(lf);
      if(Math.random()>0.4){ const fl=new THREE.Mesh(new THREE.SphereGeometry(0.06,6,6),fm); fl.position.set(nx+(Math.random()-0.5)*0.3,ny+0.3,nz+(Math.random()-0.5)*0.3); g.add(fl); }
    }
  }
  branch(0,6.8,0,0.55,0.0,0.0,1.0,4);
  branch(0,6.8,0,-0.55,0.0,1.0,0.95,4);
  branch(0,6.8,0,0.12,0.5,2.0,1.1,3);
  branch(0,6.8,0,-0.12,-0.5,3.5,1.0,3);
}

function buildConeFlower(p, g) {
  const sm=mat(p.barkColor,0.03); const lm=mat(p.leafColor,0.1,THREE.DoubleSide);
  const pm=mat(p.flowerColor,0.28,THREE.DoubleSide); const cm=mat('#6D4C41',0.05);
  for(let l=0;l<7;l++){
    const a=(l/7)*Math.PI*2;
    const sh=new THREE.Shape();
    sh.moveTo(0,0); sh.bezierCurveTo(0.1,0.15,0.16,0.35,0.06,0.72); sh.bezierCurveTo(0,0.82,-0.06,0.72,-0.06,0.72); sh.bezierCurveTo(-0.16,0.35,-0.1,0.15,0,0);
    const lf=new THREE.Mesh(new THREE.ShapeGeometry(sh,9),lm);
    lf.position.set(Math.sin(a)*0.19,0.04,Math.cos(a)*0.19); lf.rotation.y=a; lf.rotation.x=0.42; g.add(lf);
  }
  const stem=new THREE.Mesh(new THREE.CylinderGeometry(0.014,0.024,1.4,8),sm); stem.position.y=0.7; g.add(stem);
  const cone=new THREE.Mesh(new THREE.SphereGeometry(0.14,10,10),cm); cone.position.y=1.48; cone.scale.y=1.7; g.add(cone);
  for(let pt=0;pt<16;pt++){
    const a=(pt/16)*Math.PI*2;
    const sh=new THREE.Shape();
    sh.moveTo(0,0); sh.bezierCurveTo(0.05,0.1,0.1,0.24,0.04,0.52); sh.bezierCurveTo(0,0.58,-0.04,0.52,-0.04,0.52); sh.bezierCurveTo(-0.1,0.24,-0.05,0.1,0,0);
    const pet=new THREE.Mesh(new THREE.ShapeGeometry(sh,7),pm);
    pet.position.set(Math.sin(a)*0.14,1.42,Math.cos(a)*0.14); pet.rotation.y=a; pet.rotation.x=0.65; g.add(pet);
  }
}

function buildTallHerb(p, g, v=0) {
  const sm=mat(p.barkColor,0.03); const lm=mat(p.leafColor,0.12,THREE.DoubleSide);
  const fm=mat(p.flowerColor,0.32);
  const h=1.2+v*0.3;
  // Curved stem with nodes
  const pts=[];
  for(let i=0;i<=10;i++){
    const t=i/10;
    pts.push(new THREE.Vector3(Math.sin(t*1.2)*0.05,t*h,Math.cos(t*0.8)*0.03));
  }
  g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),10,0.024,7,false),sm));
  for(let lp=0;lp<7;lp++){
    const y=0.22+lp*0.22;
    for(let sd=-1;sd<=1;sd+=2){
      const sh=new THREE.Shape();
      sh.moveTo(0,0); sh.bezierCurveTo(0.1*sd,0.09,0.26*sd,0.15,0.3*sd,0); sh.bezierCurveTo(0.26*sd,-0.06,0.1*sd,-0.08,0,0);
      const lf=new THREE.Mesh(new THREE.ShapeGeometry(sh,9),lm);
      lf.position.set(0,y,0); lf.rotation.y=lp*0.4+sd*0.2; lf.rotation.x=0.28*sd; g.add(lf);
    }
  }
  if(v%2===0){
    for(let f=0;f<9;f++){
      const a=(f/9)*Math.PI*2;
      const bd=new THREE.Mesh(new THREE.SphereGeometry(0.048,7,7),fm);
      bd.position.set(Math.sin(a)*0.18,h+0.22,Math.cos(a)*0.18); g.add(bd);
      g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.007,0.007,0.2,4),sm)).position.set(Math.sin(a)*0.1,h+0.12,Math.cos(a)*0.1);
    }
  } else {
    for(let f=0;f<15;f++){
      const a=f*0.7;
      const bd=new THREE.Mesh(new THREE.SphereGeometry(0.033+Math.random()*0.01,6,6),fm);
      bd.position.set(Math.sin(a)*0.055,h+0.04+f*0.06,Math.cos(a)*0.055); g.add(bd);
    }
  }
}

function buildBushy(p, g, v=0) {
  const sm=mat(p.barkColor,0.02); const lm=mat(p.leafColor,0.1,THREE.DoubleSide);
  const fm=mat(p.flowerColor,0.28);
  for(let s=0;s<7+v;s++){
    const a=(s/(7+v))*Math.PI*2+Math.random()*0.25, h=0.4+Math.random()*0.7, ln=0.25+Math.random()*0.25;
    const pts=[];
    for(let i=0;i<=5;i++){ const t=i/5; pts.push(new THREE.Vector3(Math.sin(a)*ln*t+Math.sin(a+t)*0.04,t*h,Math.cos(a)*ln*t+Math.cos(a+t)*0.03)); }
    g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),5,0.012,5,false),sm));
    for(let l=0;l<6;l++){
      const la=a+l*0.75;
      const sh=new THREE.Shape();
      sh.moveTo(0,0); sh.bezierCurveTo(0.075,0.06,0.12,0.12,0,0.2); sh.bezierCurveTo(-0.12,0.12,-0.075,0.06,0,0);
      const lf=new THREE.Mesh(new THREE.ShapeGeometry(sh,7),lm);
      lf.position.set(Math.sin(a)*ln*0.3+Math.sin(la)*0.07,0.1+l*(h/6),Math.cos(a)*ln*0.3+Math.cos(la)*0.07);
      lf.rotation.y=la; lf.rotation.x=-0.28; g.add(lf);
    }
    const fl=new THREE.Mesh(new THREE.SphereGeometry(0.04+v*0.01,7,7),fm);
    fl.position.set(Math.sin(a)*ln*0.38,h+0.1,Math.cos(a)*ln*0.38); g.add(fl);
  }
}

function buildPlant(p, g) {
  switch(p.id){
    case 3: return buildNeem(p,g);
    case 7: return buildAloe(p,g);
    case 5: return buildSaffron(p,g);
    case 6: return buildBrahmi(p,g);
    case 13: return buildLavender(p,g);
    case 16: return buildMoringa(p,g);
    case 9: case 20: return buildVine(p,g);
    case 23: return buildGrass(p,g);
    case 27: return buildThistle(p,g);
    case 2: case 8: case 17: case 18: return buildRhizome(p,g);
    case 10: case 21: case 24: case 25: case 29: return buildLargeTree(p,g);
    case 14: case 19: case 28: case 30: return buildConeFlower(p,g);
    case 1: case 4: case 22: case 26: return buildTallHerb(p,g,p.id%3);
    default: return (p.id%2===0)?buildBushy(p,g,p.id%5):buildTallHerb(p,g,p.id%4);
  }
}

function createParticles(scene) {
  const N=600, geo=new THREE.BufferGeometry();
  const pos=new Float32Array(N*3), vel=new Float32Array(N*3), ph=new Float32Array(N);
  for(let i=0;i<N;i++){
    pos[i*3]=(Math.random()-0.5)*60; pos[i*3+1]=Math.random()*6+0.3; pos[i*3+2]=(Math.random()-0.5)*60;
    vel[i*3]=(Math.random()-0.5)*0.012; vel[i*3+1]=(Math.random()-0.5)*0.005; vel[i*3+2]=(Math.random()-0.5)*0.012;
    ph[i]=Math.random()*Math.PI*2;
  }
  geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
  const mat2=new THREE.PointsMaterial({color:0x88ffaa,size:0.06,transparent:true,opacity:0.7,blending:THREE.AdditiveBlending,depthWrite:false});
  const pts=new THREE.Points(geo,mat2);
  pts.userData={vel,ph}; scene.add(pts); return pts;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ViridyanGarden({ onBack }) {
  const mountRef=useRef(null);
  const rendererRef=useRef(null);
  const plantGroupsRef=useRef([]);
  const particlesRef=useRef(null);
  const animRef=useRef(null);
  const keysRef=useRef({});
  const soldierRef=useRef(null);
  const soldierStateRef=useRef({x:0,z:9,angle:0,walkPhase:0,speed:0,state:'idle'}); // idle|walk|run
  const clockRef=useRef(new THREE.Clock());
  const camRef=useRef(null);
  const [selectedPlant,setSelectedPlant]=useState(null);
  const [nearbyPlant,setNearbyPlant]=useState(null);
  const [loaded,setLoaded]=useState(false);
  const [tab,setTab]=useState("overview");

  const checkProx=useCallback((px,pz)=>{
    let cl=null, md=Infinity;
    for(const p of PLANTS){ const d=Math.hypot(px-p.position[0],pz-p.position[2]); if(d<4.2&&d<md){md=d;cl=p;} }
    setNearbyPlant(cl);
  },[]);

  useEffect(()=>{
    const el=mountRef.current, W=el.clientWidth, H=el.clientHeight;

    // ── Scene
    const scene=new THREE.Scene();
    scene.fog=new THREE.FogExp2(0x92bf98,0.013);
    const cam=new THREE.PerspectiveCamera(65,W/H,0.1,250);
    camRef.current=cam;

    // ── Sky gradient via hemispherelight + background
    scene.background=new THREE.Color(0xb8dec6);

    const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:"high-performance"});
    renderer.setSize(W,H); renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.physicallyCorrectLights=true;
    renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.0;
    if("outputColorSpace" in renderer) renderer.outputColorSpace=THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement); rendererRef.current=renderer;

    // ── Lighting — natural outdoor garden feel
    const hemi=new THREE.HemisphereLight(0xc9e9ff,0x3d5f32,1.15); scene.add(hemi);
    const sun=new THREE.DirectionalLight(0xfff3d6,2.1);
    sun.position.set(26,38,8); sun.castShadow=true;
    sun.shadow.mapSize.setScalar(2048);
    sun.shadow.bias=-0.0002;
    sun.shadow.normalBias=0.03;
    sun.shadow.camera.left=sun.shadow.camera.bottom=-72;
    sun.shadow.camera.right=sun.shadow.camera.top=72;
    sun.shadow.camera.far=170; scene.add(sun);
    const fill=new THREE.DirectionalLight(0x9ad5b2,0.42); fill.position.set(-25,12,24); scene.add(fill);
    const rim=new THREE.DirectionalLight(0x8fc0ff,0.26); rim.position.set(0,18,-26); scene.add(rim);

    // ── Rich Ground — layered greens
    const skyGeo=new THREE.SphereGeometry(170,32,18);
    const skyMat=new THREE.ShaderMaterial({
      side:THREE.BackSide,
      uniforms:{
        topColor:{value:new THREE.Color(0x76befe)},
        horizonColor:{value:new THREE.Color(0xbfe9ff)},
        bottomColor:{value:new THREE.Color(0xe8f2cc)},
        offset:{value:22.0},
        scale:{value:128.0}
      },
      vertexShader:`
        varying float vY;
        void main(){
          vec4 worldPos=modelMatrix*vec4(position,1.0);
          vY=worldPos.y;
          gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
        }
      `,
      fragmentShader:`
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float scale;
        varying float vY;
        void main(){
          float h=clamp((vY+offset)/scale,0.0,1.0);
          vec3 col=mix(bottomColor,horizonColor,smoothstep(0.0,0.58,h));
          col=mix(col,topColor,smoothstep(0.35,1.0,h));
          gl_FragColor=vec4(col,1.0);
        }
      `
    });
    scene.add(new THREE.Mesh(skyGeo,skyMat));

    const terrainHeight=(x,z)=>{
      const radial=Math.hypot(x,z);
      const base=Math.sin(x*0.14)*Math.cos(z*0.16)*0.7;
      const micro=Math.sin(x*0.52+z*0.39)*0.18+Math.sin(x*1.12-z*0.87)*0.08;
      const rimLift=Math.max(0,radial-36)*0.02;
      let y=base+micro+rimLift;
      if(radial<10) y*=0.45;
      return y;
    };

    const gg=new THREE.PlaneGeometry(120,120,120,120), gp=gg.attributes.position;
    const gCols=[];
    const gLow=new THREE.Color(0x355d2f);
    const gMid=new THREE.Color(0x4f813f);
    const gHigh=new THREE.Color(0x81ab56);
    const gLoam=new THREE.Color(0x6b5b3d);
    for(let i=0;i<gp.count;i++){
      const x=gp.getX(i), z=gp.getZ(i), radial=Math.hypot(x,z);
      const y=terrainHeight(x,z);
      gp.setY(i,y);

      const mix=THREE.MathUtils.clamp((y+0.9)/2.1,0,1);
      const col=gLow.clone().lerp(gMid,mix).lerp(gHigh,Math.max(0,mix-0.45));
      if(radial<6.5) col.lerp(gLoam,0.23);
      gCols.push(col.r,col.g,col.b);
    }
    gg.setAttribute("color",new THREE.Float32BufferAttribute(gCols,3));
    gg.computeVertexNormals();
    gg.setAttribute("uv2",new THREE.BufferAttribute(new Float32Array(gg.attributes.uv.array),2));

    const texSize=768;
    const groundCanvas=document.createElement("canvas");
    groundCanvas.width=texSize; groundCanvas.height=texSize;
    const gtx=groundCanvas.getContext("2d");
    const gImg=gtx.createImageData(texSize,texSize);
    const hMap=new Float32Array(texSize*texSize);
    const rMap=new Float32Array(texSize*texSize);

    const fract=(v)=>v-Math.floor(v);
    const smooth=(t)=>t*t*(3-2*t);
    const hash2=(x,y)=>fract(Math.sin(x*127.1+y*311.7)*43758.5453123);
    const valueNoise=(x,y)=>{
      const xi=Math.floor(x), yi=Math.floor(y);
      const xf=x-xi, yf=y-yi;
      const a=hash2(xi,yi), b=hash2(xi+1,yi), c=hash2(xi,yi+1), d=hash2(xi+1,yi+1);
      const u=smooth(xf), v=smooth(yf);
      return a*(1-u)*(1-v)+b*u*(1-v)+c*(1-u)*v+d*u*v;
    };
    const fbm=(x,y,oct=5)=>{
      let f=1, a=0.5, s=0, n=0;
      for(let i=0;i<oct;i++){
        s+=valueNoise(x*f,y*f)*a;
        n+=a;
        f*=2.03;
        a*=0.5;
      }
      return s/n;
    };
    const mix=(a,b,t)=>a+(b-a)*t;
    const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

    for(let y=0;y<texSize;y++){
      for(let x=0;x<texSize;x++){
        const idx=y*texSize+x;
        const nx=x/texSize, ny=y/texSize;
        const macro=fbm(nx*2.2+0.7,ny*2.4+1.1,5);
        const medium=fbm(nx*10.0+12.3,ny*9.6+6.7,4);
        const micro=fbm(nx*48.0+31.4,ny*47.0+18.8,3);
        const moisture=fbm(nx*4.0+17.0,ny*4.6+11.0,4);
        const pebbles=fbm(nx*92.0+41.0,ny*87.0+7.0,2);

        const heightVal=clamp(macro*0.62+medium*0.28+micro*0.1,0,1);
        hMap[idx]=heightVal;

        const grassMask=clamp(0.2+moisture*0.78-Math.abs(heightVal-0.55)*0.55,0,1);
        const dryMask=clamp((heightVal-0.66)*2.1,0,1);
        const soilMask=clamp(1-grassMask*0.9+dryMask*0.25,0,1);

        const soil=[92,80,56];
        const darkSoil=[66,57,41];
        const grass=[95,128,62];
        const moss=[62,98,50];
        const dry=[129,120,83];

        const sTone=mix(soil[0],darkSoil[0],medium);
        const sToneG=mix(soil[1],darkSoil[1],medium);
        const sToneB=mix(soil[2],darkSoil[2],medium);
        let r=mix(sTone,mix(grass[0],moss[0],0.45+micro*0.35),grassMask);
        let g=mix(sToneG,mix(grass[1],moss[1],0.45+micro*0.35),grassMask);
        let b=mix(sToneB,mix(grass[2],moss[2],0.45+micro*0.35),grassMask);
        r=mix(r,dry[0],dryMask*0.45);
        g=mix(g,dry[1],dryMask*0.45);
        b=mix(b,dry[2],dryMask*0.45);

        const peb=(pebbles-0.5)*34;
        r=clamp(r+peb,0,255);
        g=clamp(g+peb*0.8,0,255);
        b=clamp(b+peb*0.55,0,255);

        const i4=idx*4;
        gImg.data[i4]=r|0;
        gImg.data[i4+1]=g|0;
        gImg.data[i4+2]=b|0;
        gImg.data[i4+3]=255;

        rMap[idx]=clamp(0.58+soilMask*0.28+micro*0.12+pebbles*0.08,0,1);
      }
    }
    gtx.putImageData(gImg,0,0);

    const roughCanvas=document.createElement("canvas");
    roughCanvas.width=texSize; roughCanvas.height=texSize;
    const rtx=roughCanvas.getContext("2d");
    const rImg=rtx.createImageData(texSize,texSize);
    for(let i=0;i<rMap.length;i++){
      const v=(rMap[i]*255)|0;
      const i4=i*4;
      rImg.data[i4]=v; rImg.data[i4+1]=v; rImg.data[i4+2]=v; rImg.data[i4+3]=255;
    }
    rtx.putImageData(rImg,0,0);

    const normalCanvas=document.createElement("canvas");
    normalCanvas.width=texSize; normalCanvas.height=texSize;
    const ntx=normalCanvas.getContext("2d");
    const nimg=ntx.createImageData(texSize,texSize);
    for(let y=0;y<texSize;y++){
      for(let x=0;x<texSize;x++){
        const idx=y*texSize+x;
        const xl=y*texSize+((x+texSize-1)%texSize), xr=y*texSize+((x+1)%texSize);
        const yu=((y+texSize-1)%texSize)*texSize+x, yd=((y+1)%texSize)*texSize+x;
        const hL=hMap[xl], hR=hMap[xr], hU=hMap[yu], hD=hMap[yd];
        let nx=(hL-hR)*3.0, ny=(hU-hD)*3.0, nz=1.0;
        const len=Math.hypot(nx,ny,nz)||1;
        nx/=len; ny/=len; nz/=len;
        const i4=idx*4;
        nimg.data[i4]=Math.round((nx*0.5+0.5)*255);
        nimg.data[i4+1]=Math.round((ny*0.5+0.5)*255);
        nimg.data[i4+2]=Math.round((nz*0.5+0.5)*255);
        nimg.data[i4+3]=255;
      }
    }
    ntx.putImageData(nimg,0,0);

    const aoCanvas=document.createElement("canvas");
    aoCanvas.width=texSize; aoCanvas.height=texSize;
    const atx=aoCanvas.getContext("2d");
    const aimg=atx.createImageData(texSize,texSize);
    const heightCanvas=document.createElement("canvas");
    heightCanvas.width=texSize; heightCanvas.height=texSize;
    const htx=heightCanvas.getContext("2d");
    const himg=htx.createImageData(texSize,texSize);
    for(let i=0;i<hMap.length;i++){
      const ao=clamp(0.5+(0.5-hMap[i])*0.42+(rMap[i]-0.5)*0.16,0,1);
      const hv=clamp(hMap[i]*0.9 + (1-rMap[i])*0.1,0,1);
      const i4=i*4;
      const a=(ao*255)|0, h=(hv*255)|0;
      aimg.data[i4]=a; aimg.data[i4+1]=a; aimg.data[i4+2]=a; aimg.data[i4+3]=255;
      himg.data[i4]=h; himg.data[i4+1]=h; himg.data[i4+2]=h; himg.data[i4+3]=255;
    }
    atx.putImageData(aimg,0,0);
    htx.putImageData(himg,0,0);

    const groundTex=new THREE.CanvasTexture(groundCanvas);
    groundTex.wrapS=groundTex.wrapT=THREE.RepeatWrapping;
    groundTex.repeat.set(10,10);
    groundTex.colorSpace=THREE.SRGBColorSpace;
    groundTex.anisotropy=Math.min(12,renderer.capabilities.getMaxAnisotropy());
    groundTex.needsUpdate=true;

    const roughTex=new THREE.CanvasTexture(roughCanvas);
    roughTex.wrapS=roughTex.wrapT=THREE.RepeatWrapping;
    roughTex.repeat.set(10,10);
    roughTex.anisotropy=Math.min(12,renderer.capabilities.getMaxAnisotropy());
    roughTex.needsUpdate=true;

    const normalTex=new THREE.CanvasTexture(normalCanvas);
    normalTex.wrapS=normalTex.wrapT=THREE.RepeatWrapping;
    normalTex.repeat.set(10,10);
    normalTex.anisotropy=Math.min(12,renderer.capabilities.getMaxAnisotropy());
    normalTex.needsUpdate=true;

    const aoTex=new THREE.CanvasTexture(aoCanvas);
    aoTex.wrapS=aoTex.wrapT=THREE.RepeatWrapping;
    aoTex.repeat.set(10,10);
    aoTex.anisotropy=Math.min(12,renderer.capabilities.getMaxAnisotropy());
    aoTex.needsUpdate=true;

    const heightTex=new THREE.CanvasTexture(heightCanvas);
    heightTex.wrapS=heightTex.wrapT=THREE.RepeatWrapping;
    heightTex.repeat.set(10,10);
    heightTex.anisotropy=Math.min(12,renderer.capabilities.getMaxAnisotropy());
    heightTex.needsUpdate=true;

    const groundMesh=new THREE.Mesh(
      gg,
      new THREE.MeshStandardMaterial({
        vertexColors:true,
        map:groundTex,
        roughnessMap:roughTex,
        aoMap:aoTex,
        aoMapIntensity:0.52,
        normalMap:normalTex,
        normalScale:new THREE.Vector2(0.55,0.55),
        displacementMap:heightTex,
        displacementScale:0.065,
        displacementBias:-0.03,
        roughness:0.92,
        metalness:0.02
      })
    );
    groundMesh.rotation.x=-Math.PI/2; groundMesh.receiveShadow=true; scene.add(groundMesh);

    // Removed circular patch decals; texture layering handles ground variation.

    const rockMat=new THREE.MeshStandardMaterial({color:0x7b7f73,roughness:0.98,metalness:0.02});
    for(let i=0;i<95;i++){
      const a=Math.random()*Math.PI*2, r=9+Math.random()*49;
      const x=Math.sin(a)*r, z=Math.cos(a)*r;
      const y=terrainHeight(x,z);
      const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(0.14+Math.random()*0.34,0),rockMat);
      rock.position.set(x,y+0.08,z);
      rock.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI);
      const s=0.6+Math.random()*1.4;
      rock.scale.set(s,0.45+Math.random()*0.7,s);
      rock.castShadow=true;
      rock.receiveShadow=true;
      scene.add(rock);
    }

    const bladeCanvas=document.createElement("canvas");
    bladeCanvas.width=64; bladeCanvas.height=256;
    const bctx=bladeCanvas.getContext("2d");
    const bgrad=bctx.createLinearGradient(0,256,0,0);
    bgrad.addColorStop(0,"rgba(86,132,56,0.98)");
    bgrad.addColorStop(0.6,"rgba(114,163,72,0.95)");
    bgrad.addColorStop(1,"rgba(194,224,132,0.9)");
    bctx.fillStyle=bgrad;
    bctx.beginPath();
    bctx.moveTo(32,2);
    bctx.bezierCurveTo(46,28,48,180,32,254);
    bctx.bezierCurveTo(16,180,18,28,32,2);
    bctx.closePath();
    bctx.fill();
    const bladeTex=new THREE.CanvasTexture(bladeCanvas);
    bladeTex.colorSpace=THREE.SRGBColorSpace;

    const grassColors=[0x5a9548,0x6aa252,0x4d883d];
    const grassMats=grassColors.map((c)=>new THREE.MeshStandardMaterial({
      color:c,
      map:bladeTex,
      alphaMap:bladeTex,
      transparent:true,
      alphaTest:0.34,
      roughness:0.96,
      metalness:0.0,
      side:THREE.DoubleSide
    }));

    const bladeGeo=new THREE.PlaneGeometry(0.11,1.0,1,6);
    const bp=bladeGeo.attributes.position;
    for(let i=0;i<bp.count;i++){
      const y=bp.getY(i)+0.5;
      const taper=0.18+(1-y)*0.82;
      const bent=Math.pow(y,1.8)*0.12;
      bp.setX(i,bp.getX(i)*taper+bent);
    }
    bladeGeo.translate(0,0.5,0);
    bladeGeo.computeVertexNormals();

    const grassTufts=[];
    for(let i=0;i<760;i++){
      const a=Math.random()*Math.PI*2, r=6+Math.random()*52;
      const x=Math.sin(a)*r, z=Math.cos(a)*r;
      if(Math.hypot(x,z)<8) continue;
      const y=terrainHeight(x,z)+0.01;
      const tuft=new THREE.Group();
      const blades=3+Math.floor(Math.random()*2);
      for(let b=0;b<blades;b++){
        const blade=new THREE.Mesh(bladeGeo,grassMats[Math.floor(Math.random()*grassMats.length)]);
        const s=0.42+Math.random()*0.92;
        blade.scale.set(0.55+Math.random()*0.8,s,0.55+Math.random()*0.8);
        blade.position.set((Math.random()-0.5)*0.08,0,(Math.random()-0.5)*0.08);
        blade.rotation.y=(b/blades)*Math.PI+Math.random()*0.8;
        blade.rotation.x=-0.06+Math.random()*0.1;
        tuft.add(blade);
      }
      tuft.position.set(x,y,z);
      tuft.rotation.y=Math.random()*Math.PI;
      tuft.userData.phase=Math.random()*Math.PI*2;
      tuft.userData.amp=0.04+Math.random()*0.05;
      scene.add(tuft);
      grassTufts.push(tuft);
    }

    const hillMat=new THREE.MeshStandardMaterial({color:0x4f7444,roughness:1,metalness:0,flatShading:true});
    for(let i=0;i<18;i++){
      const a=(i/18)*Math.PI*2, r=52+Math.random()*18;
      const h=5+Math.random()*8, w=5+Math.random()*9;
      const hill=new THREE.Mesh(new THREE.ConeGeometry(w,h,9),hillMat);
      const hx=Math.sin(a)*r, hz=Math.cos(a)*r;
      hill.position.set(hx,terrainHeight(hx,hz)+h*0.45-0.25,hz);
      hill.rotation.y=Math.random()*Math.PI;
      hill.castShadow=true; hill.receiveShadow=true;
      scene.add(hill);
    }

    const bgTreeLm=new THREE.MeshStandardMaterial({color:0x1f6f2c,roughness:0.9});
    const bgTrunkLm=new THREE.MeshStandardMaterial({color:0x5d3c23,roughness:0.98});
    for(let i=0;i<36;i++){
      const a=(i/36)*Math.PI*2, r=34+Math.random()*20;
      const tx=Math.sin(a)*r, tz=Math.cos(a)*r;
      const tg=new THREE.Group(); tg.position.set(tx,terrainHeight(tx,tz),tz);
      const h=4+Math.random()*6;
      const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.34,h,8),bgTrunkLm); trunk.position.y=h/2; trunk.castShadow=true; tg.add(trunk);
      for(let c=0;c<3;c++){
        const cr=new THREE.Mesh(new THREE.SphereGeometry(1.5+Math.random()*1.2,8,6),bgTreeLm);
        cr.position.set((Math.random()-0.5)*1.4,h*0.68+c*1.12,(Math.random()-0.5)*1.4); cr.castShadow=true; tg.add(cr);
      }
      scene.add(tg);
    }

    // Mushroom accents inspired by v4 styling
    const buildMushroom=(x,z,scale=1,capColor=0xff4444)=>{
      const g=new THREE.Group();
      const y=terrainHeight(x,z);
      const stemMat=new THREE.MeshStandardMaterial({color:0xf5e6c8,roughness:0.9});
      const capMat=new THREE.MeshStandardMaterial({color:capColor,roughness:0.82,metalness:0.02,emissive:new THREE.Color(capColor).multiplyScalar(0.08)});
      const spotMat=new THREE.MeshStandardMaterial({color:0xffffff,roughness:0.95});
      const stem=new THREE.Mesh(new THREE.CylinderGeometry(0.055*scale,0.075*scale,0.28*scale,8),stemMat);
      stem.position.y=y+0.14*scale; stem.castShadow=true; g.add(stem);
      const cap=new THREE.Mesh(new THREE.SphereGeometry(0.22*scale,9,7,0,Math.PI*2,0,Math.PI*0.56),capMat);
      cap.position.y=y+0.28*scale; cap.castShadow=true; g.add(cap);
      [[0,0.14],[0.14,0.07],[-0.12,0.08],[0.05,-0.13]].forEach(([sx,sz])=>{
        const spot=new THREE.Mesh(new THREE.SphereGeometry(0.035*scale,5,5),spotMat);
        const len=Math.sqrt(sx*sx+sz*sz);
        const ny=Math.sqrt(Math.max(0,(0.22*scale)**2 - len*len*(scale*scale)));
        spot.position.set(sx*scale,y+0.28*scale+ny*0.88,sz*scale);
        g.add(spot);
      });
      g.position.set(x,0,z);
      scene.add(g);
    };

    const mushroomColors=[0xff3333,0xff6600,0xcc2288,0xdd4400,0xff2255,0xaa3300];
    for(let i=0;i<30;i++){
      const a=(i/30)*Math.PI*2, r=35+Math.random()*15;
      const tx=Math.sin(a)*r, tz=Math.cos(a)*r;
      const count=2+Math.floor(Math.random()*3);
      for(let m=0;m<count;m++){
        const mx=tx+(Math.random()-0.5)*3.5;
        const mz=tz+(Math.random()-0.5)*3.5;
        const sc=0.5+Math.random()*0.8;
        const col=mushroomColors[Math.floor(Math.random()*mushroomColors.length)];
        buildMushroom(mx,mz,sc,col);
      }
    }

    const stemMat=new THREE.MeshStandardMaterial({color:0x4d8a42,roughness:1});
    const petalMats=[0xf6d989,0xd4e89f,0xffb7b2,0xd4bcff].map((c)=>new THREE.MeshStandardMaterial({color:c,roughness:0.85}));
    for(let k=0;k<26;k++){
      let cx=(Math.random()-0.5)*54, cz=(Math.random()-0.5)*54;
      if(Math.hypot(cx,cz)<7){ cx+=8*(Math.random()>0.5?1:-1); cz-=8; }
      const blooms=3+Math.floor(Math.random()*5);
      for(let b=0;b<blooms;b++){
        const ox=(Math.random()-0.5)*1.6, oz=(Math.random()-0.5)*1.6;
        const sh=0.18+Math.random()*0.22;
        const sy=terrainHeight(cx+ox,cz+oz);
        const stem=new THREE.Mesh(new THREE.CylinderGeometry(0.012,0.016,sh,5),stemMat);
        stem.position.set(cx+ox,sy+sh*0.5,cz+oz);
        const flower=new THREE.Mesh(new THREE.SphereGeometry(0.045+Math.random()*0.03,6,5),petalMats[Math.floor(Math.random()*petalMats.length)]);
        flower.position.set(cx+ox,sy+sh+0.035,cz+oz);
        scene.add(stem); scene.add(flower);
      }
    }

    const clouds=[];
    const cloudMatA=new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:0.72,roughness:1});
    const cloudMatB=new THREE.MeshStandardMaterial({color:0xf0f8ff,transparent:true,opacity:0.55,roughness:1});
    for(let c=0;c<14;c++){
      const cg=new THREE.Group();
      cg.position.set((Math.random()-0.5)*96,22+Math.random()*15,(Math.random()-0.5)*96);
      cg.userData.drift={x:(Math.random()-0.5)*0.003,z:(Math.random()-0.5)*0.002};
      for(let p=0;p<5;p++){
        const cp=new THREE.Mesh(new THREE.SphereGeometry(1.6+Math.random()*2.2,8,6),Math.random()>0.5?cloudMatA:cloudMatB);
        cp.position.set((Math.random()-0.5)*4.3,(Math.random()-0.5)*1.3,(Math.random()-0.5)*3.2); cg.add(cp);
      }
      clouds.push(cg);
      scene.add(cg);
    }
    const soldier=buildSoldier(scene);
    soldier.position.set(0,0,9);
    soldierRef.current=soldier;

    // ── Build all 30 plants
    const groups=[];
    PLANTS.forEach(plant=>{
      const group=new THREE.Group(); group.position.set(...plant.position); group.userData.plantId=plant.id;
      buildPlant(plant,group);
      // Interaction ring
      const ring=new THREE.Mesh(
        new THREE.TorusGeometry(0.6,0.025,8,36),
        new THREE.MeshBasicMaterial({color:plant.flowerColor,transparent:true,opacity:0.0})
      );
      ring.position.y=0.12; ring.rotation.x=-Math.PI/2; ring.userData.isRing=true; group.add(ring);
      // Glow light
      const aura=new THREE.PointLight(plant.flowerColor,0.5,5.5); aura.position.y=1.5; group.add(aura);
      scene.add(group);
      groups.push({group,plant,ring,aura});
    });
    plantGroupsRef.current=groups;
    particlesRef.current=createParticles(scene);

    // Input
    const onKey=e=>{ keysRef.current[e.code]=e.type==="keydown"; };
    window.addEventListener("keydown",onKey); window.addEventListener("keyup",onKey);

    // Click
    const ray=new THREE.Raycaster(), mouse=new THREE.Vector2();
    const onClick=e=>{
      const rect=el.getBoundingClientRect();
      mouse.x=((e.clientX-rect.left)/rect.width)*2-1; mouse.y=-((e.clientY-rect.top)/rect.height)*2+1;
      ray.setFromCamera(mouse,cam);
      const all=[]; groups.forEach(({group})=>group.traverse(c=>{ if(c.isMesh&&!c.userData.isRing) all.push(c); }));
      const hits=ray.intersectObjects(all);
      for(const hit of hits){
        let obj=hit.object;
        while(obj){
          const pid=obj.userData?.plantId;
          if(pid){
            const p=PLANTS.find(x=>x.id===pid);
            if(p){ setSelectedPlant(p); setTab("overview"); }
            return;
          }
          obj=obj.parent;
        }
      }
    };
    el.addEventListener("click",onClick);
    const onResize=()=>{ const W2=el.clientWidth,H2=el.clientHeight; cam.aspect=W2/H2; cam.updateProjectionMatrix(); renderer.setSize(W2,H2); };
    window.addEventListener("resize",onResize);
    setLoaded(true);

    let t=0;
    const animate=()=>{
      animRef.current=requestAnimationFrame(animate);
      const dt=Math.min(clockRef.current.getDelta(),0.05); t+=dt;
      const keys=keysRef.current, ss=soldierStateRef.current;
      const isShift=keys["ShiftLeft"]||keys["ShiftRight"];
      const walkSpd=4.5, runSpd=8.5, rotSpd=2.2;

      const prevState=ss.state;
      ss.state='idle'; ss.speed=0;

      if(keys["KeyW"]||keys["ArrowUp"]){
        const spd=isShift?runSpd:walkSpd;
        ss.x+=-Math.sin(ss.angle)*spd*dt; ss.z+=-Math.cos(ss.angle)*spd*dt;
        ss.speed=spd; ss.state=isShift?'run':'walk';
      }
      if(keys["KeyS"]||keys["ArrowDown"]){
        ss.x+=Math.sin(ss.angle)*walkSpd*0.7*dt; ss.z+=Math.cos(ss.angle)*walkSpd*0.7*dt;
        ss.speed=walkSpd*0.7; ss.state='walk';
      }
      if(keys["KeyA"]||keys["ArrowLeft"]){ ss.angle+=rotSpd*dt; if(!ss.state!=='idle') ss.state='walk'; }
      if(keys["KeyD"]||keys["ArrowRight"]){ ss.angle-=rotSpd*dt; if(!ss.state!=='idle') ss.state='walk'; }
      if(keys["KeyQ"]){ ss.x+=-Math.sin(ss.angle-Math.PI/2)*walkSpd*dt; ss.z+=-Math.cos(ss.angle-Math.PI/2)*walkSpd*dt; ss.state='walk'; }
      if(keys["KeyE"]){ ss.x+=-Math.sin(ss.angle+Math.PI/2)*walkSpd*dt; ss.z+=-Math.cos(ss.angle+Math.PI/2)*walkSpd*dt; ss.state='walk'; }

      ss.x=Math.max(-38,Math.min(38,ss.x)); ss.z=Math.max(-42,Math.min(13,ss.z));

      const phaseSpeed = ss.state==='run'?10:ss.state==='walk'?6:0;
      if(phaseSpeed>0) ss.walkPhase+=dt*phaseSpeed;

      // Update soldier
      const sol=soldierRef.current;
      if(sol){
        sol.position.set(ss.x,0,ss.z);
        sol.rotation.y=ss.angle;

        // Animate legs and arms
        const legSwing = ss.state==='run'?0.65:ss.state==='walk'?0.42:0;
        const armSwing = ss.state==='run'?0.5:ss.state==='walk'?0.32:0;
        const leanFwd  = ss.state==='run'?0.18:0;

        sol.rotation.x=leanFwd;

        sol.traverse(child=>{
          if(child.userData.isLeg){
            const target=Math.sin(ss.walkPhase+(child.userData.side===1?0:Math.PI))*legSwing;
            child.rotation.x+=(target-child.rotation.x)*0.2;
          }
          if(child.userData.isArm){
            const target=Math.sin(ss.walkPhase+(child.userData.side===1?Math.PI:0))*armSwing;
            child.rotation.x+=(target-child.rotation.x)*0.2;
          }
        });

        // Idle breathing bob
        if(ss.state==='idle') sol.position.y=Math.sin(t*1.5)*0.012;
        else if(ss.state==='walk') sol.position.y=Math.abs(Math.sin(ss.walkPhase))*0.04;
        else sol.position.y=Math.abs(Math.sin(ss.walkPhase))*0.08;
      }

      // 3rd person camera
      const camDist=ss.state==='run'?7:5.8;
      const camHeight=ss.state==='run'?3.5:3.0;
      const camTx=ss.x-Math.sin(ss.angle)*1.5, camTz=ss.z-Math.cos(ss.angle)*1.5;
      const idealX=ss.x+Math.sin(ss.angle)*camDist, idealZ=ss.z+Math.cos(ss.angle)*camDist;
      cam.position.x+=(idealX-cam.position.x)*0.08;
      cam.position.y+=(camHeight-cam.position.y)*0.08;
      cam.position.z+=(idealZ-cam.position.z)*0.08;
      cam.lookAt(camTx,1.2,camTz);

      checkProx(ss.x,ss.z);

      // Plant animations
      groups.forEach(({group,ring,aura,plant},idx)=>{
        const wp=idx*0.42+t*0.48;
        group.rotation.z=Math.sin(wp)*0.02;
        group.rotation.x=Math.cos(wp*0.68)*0.014;
        if(ring){
          ring.rotation.z+=dt*0.8;
          const d=Math.hypot(ss.x-plant.position[0],ss.z-plant.position[2]);
          const targetOp=d<5?0.85:0.0;
          ring.material.opacity+=(targetOp-ring.material.opacity)*0.06;
          ring.scale.setScalar(1+Math.sin(t*1.8+idx*0.8)*0.1);
        }
        if(aura) aura.intensity=0.4+Math.sin(t*1.5+idx)*0.25;
      });

      // Particles (pollen/fireflies in daylight)
      const ptcl=particlesRef.current;
      if(ptcl){
        const pos=ptcl.geometry.attributes.position, vel=ptcl.userData.vel, ph=ptcl.userData.ph;
        for(let i=0;i<pos.count;i++){
          pos.setX(i,pos.getX(i)+vel[i*3]+Math.sin(t*0.44+ph[i])*0.003);
          pos.setY(i,pos.getY(i)+vel[i*3+1]+Math.sin(t*0.88+ph[i])*0.003);
          pos.setZ(i,pos.getZ(i)+vel[i*3+2]+Math.cos(t*0.62+ph[i])*0.003);
          if(pos.getY(i)>6||pos.getY(i)<0.2) vel[i*3+1]*=-1;
          if(Math.abs(pos.getX(i))>28) vel[i*3]*=-1;
          if(Math.abs(pos.getZ(i))>28) vel[i*3+2]*=-1;
        }
        pos.needsUpdate=true;
        ptcl.material.opacity=0.45+Math.sin(t*0.4)*0.15;
      }

      // cloud drift
      clouds.forEach((cg,idx)=>{
        cg.position.x+=cg.userData.drift.x+Math.sin(t*0.05+idx)*0.0008;
        cg.position.z+=cg.userData.drift.z+Math.cos(t*0.04+idx*0.7)*0.0006;
      });

      grassTufts.forEach((tuft)=>{
        const sway=Math.sin(t*1.8+tuft.userData.phase)*tuft.userData.amp;
        tuft.rotation.z=sway*0.35;
        tuft.children.forEach((blade,idx)=>{
          blade.rotation.z=sway*(0.55+idx*0.14);
        });
      });

      renderer.render(scene,cam);
    };
    animate();

    return()=>{
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("keydown",onKey); window.removeEventListener("keyup",onKey);
      window.removeEventListener("resize",onResize); el.removeEventListener("click",onClick);
      renderer.dispose();
      if(el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  },[checkProx]);

  return (
    <div style={{width:"100vw",height:"100vh",background:"#b8dec6",position:"relative",overflow:"hidden",userSelect:"none",fontFamily:"'Palatino Linotype',Palatino,Georgia,serif"}}>
      <div ref={mountRef} style={{width:"100%",height:"100%",cursor:"crosshair"}}/>

      {/* ── MINIMAL TITLE ONLY ── */}
      <div style={{position:"absolute",top:0,left:0,right:0,padding:"16px 28px",background:"linear-gradient(180deg,rgba(0,0,0,0.55) 0%,transparent 100%)",display:"flex",alignItems:"center",justifyContent:"space-between",zIndex:100,pointerEvents:"none"}}>
        <div style={{display:"flex",alignItems:"center",gap:11}}>
          <span style={{fontSize:26,filter:"drop-shadow(0 0 8px #00ff8888)"}}>🌿</span>
          <div>
            <div style={{color:"#eaffd0",fontSize:22,fontWeight:"bold",letterSpacing:"0.16em",textShadow:"0 2px 18px rgba(0,0,0,0.6), 0 0 30px #44ff8844"}}>VIRIDYAN</div>
            <div style={{color:"#a8ffb0",fontSize:"10px",letterSpacing:"0.32em",marginTop:-2,opacity:0.9}}>DIGITAL GARDEN</div>
          </div>
        </div>
              <div
          style={{
            color:"rgba(220,255,220,0.82)",
            fontSize:10,
            letterSpacing:"0.12em",
            textTransform:"uppercase",
            textShadow:"0 1px 4px rgba(0,0,0,0.5)",
            marginRight:onBack?88:0
          }}
        >
          {soldierStateRef.current.state}
        </div>
      </div>

      {onBack && (
        <button
          onClick={onBack}
          style={{
            position:"absolute",
            top:20,
            right:24,
            zIndex:220,
            border:"1px solid rgba(180,255,180,0.5)",
            background:"rgba(6,28,6,0.75)",
            color:"#d6ffd6",
            borderRadius:20,
            padding:"8px 14px",
            cursor:"pointer",
            letterSpacing:"0.08em",
            fontSize:11
          }}
        >
          Back Home
        </button>
      )}

      {/* ── LOADING ── */}
      {!loaded&&(
        <div style={{position:"absolute",inset:0,background:"#3a6a2a",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:999}}>
          <div style={{fontSize:52,marginBottom:20,animation:"spin 2.5s linear infinite"}}>🌱</div>
          <div style={{color:"#c8ffcc",fontSize:18,letterSpacing:"0.3em"}}>Growing the Garden…</div>
        </div>
      )}

      {/* ── NEARBY PLANT ── */}
      {nearbyPlant&&!selectedPlant&&(
        <div
          onClick={()=>{ setSelectedPlant(nearbyPlant); setTab("overview"); }}
          style={{position:"absolute",bottom:100,left:"50%",transform:"translateX(-50%)",background:"rgba(10,30,10,0.88)",border:`2px solid ${nearbyPlant.flowerColor}`,borderRadius:30,padding:"10px 28px",color:"#fff",fontSize:13,backdropFilter:"blur(8px)",zIndex:200,boxShadow:`0 0 30px ${nearbyPlant.flowerColor}66`,animation:"breathe 1.8s ease-in-out infinite",whiteSpace:"nowrap",cursor:"pointer"}}
        >
          🌿 Near <strong style={{color:nearbyPlant.flowerColor}}>{nearbyPlant.name}</strong>
          <span style={{color:"#aaa",fontSize:11}}> — Click to learn more</span>
        </div>
      )}

      {/* ── CONTROLS HINT (minimal bottom-left) ── */}
      <div style={{position:"absolute",bottom:24,left:24,zIndex:100,color:"rgba(220,255,220,0.7)",fontSize:11,letterSpacing:"0.1em",textShadow:"0 1px 4px rgba(0,0,0,0.5)",lineHeight:1.8}}>
        <div style={{marginBottom:4,color:"rgba(180,255,180,0.9)",fontSize:10,letterSpacing:"0.2em"}}>CONTROLS</div>
        <div>WASD · Move, Shift · Run, Q/E · Strafe</div>
        <div>Click plant to inspect</div>
      </div>

      {/* ── MINIMAP ── */}
      <div style={{position:"absolute",bottom:24,right:24,width:116,height:116,background:"rgba(5,20,5,0.75)",border:"1px solid rgba(100,220,100,0.4)",borderRadius:"50%",backdropFilter:"blur(8px)",zIndex:200,overflow:"hidden",boxShadow:"0 0 20px rgba(0,0,0,0.4)"}}>
        <svg width="116" height="116" viewBox="0 0 116 116">
          <defs><clipPath id="mc"><circle cx="58" cy="58" r="55"/></clipPath></defs>
          <circle cx="58" cy="58" r="55" fill="rgba(20,60,20,0.8)"/>
          {PLANTS.map(p=>(
            <circle key={p.id} cx={((p.position[0]+38)/76)*106+5} cy={((p.position[2]+42)/55)*106+5} r="3.5" fill={p.flowerColor} opacity="0.9">
              <animate attributeName="opacity" values="0.6;1;0.6" dur={`${1.5+p.id*0.07}s`} repeatCount="indefinite"/>
            </circle>
          ))}
          <circle
            cx={((soldierStateRef.current.x+38)/76)*106+5}
            cy={((soldierStateRef.current.z+42)/55)*106+5}
            r="5.5" fill="#C8A96E" stroke="#FFD700" strokeWidth="2"/>
        </svg>
        <div style={{position:"absolute",top:6,left:"50%",transform:"translateX(-50%)",color:"rgba(180,255,180,0.8)",fontSize:"8px",letterSpacing:"0.14em"}}>MAP</div>
      </div>

      {/* ── PLANT INFO PANEL ── */}
      {selectedPlant&&(
        <div style={{position:"absolute",inset:0,background:"rgba(0,15,0,0.65)",backdropFilter:"blur(8px)",zIndex:600,display:"flex",alignItems:"center",justifyContent:"center"}}
          onClick={e=>{if(e.target===e.currentTarget){setSelectedPlant(null);setTab("overview");}}}>
          <div style={{
            background:"linear-gradient(140deg,rgba(4,18,6,0.98),rgba(8,28,10,0.98))",
            border:`1.5px solid ${selectedPlant.flowerColor}66`,
            borderRadius:26, padding:"36px 40px", maxWidth:660, width:"92%",
            color:"#e8f5e9",
            boxShadow:`0 0 80px ${selectedPlant.flowerColor}28, 0 24px 60px rgba(0,0,0,0.7), inset 0 0 60px rgba(0,20,0,0.3)`,
            position:"relative", animation:"panelIn 0.38s cubic-bezier(0.34,1.56,0.64,1)",
            maxHeight:"88vh", overflowY:"auto"
          }}>
            {/* Decorative light bleed */}
            <div style={{position:"absolute",top:0,right:0,width:240,height:240,background:`radial-gradient(circle at top right,${selectedPlant.flowerColor}14,transparent)`,borderRadius:"0 26px 0 0",pointerEvents:"none"}}/>
            <div style={{position:"absolute",bottom:0,left:0,width:180,height:180,background:`radial-gradient(circle at bottom left,${selectedPlant.leafColor}0c,transparent)`,borderRadius:"0 0 0 26px",pointerEvents:"none"}}/>

            {/* Header */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
              <div>
                <span style={{display:"inline-block",background:`${selectedPlant.flowerColor}22`,border:`1px solid ${selectedPlant.flowerColor}55`,color:selectedPlant.flowerColor,borderRadius:20,padding:"3px 14px",fontSize:"10px",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:9}}>{selectedPlant.category}</span>
                <h2 style={{margin:0,fontSize:30,color:"#f1f8e9",letterSpacing:"0.055em",textShadow:`0 0 30px ${selectedPlant.flowerColor}66`,lineHeight:1.1}}>{selectedPlant.name}</h2>
                <div style={{color:"#81c784",fontSize:13,fontStyle:"italic",marginTop:4}}>{selectedPlant.scientific}</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:9}}>
                <span style={{background:selectedPlant.rarity==="Rare"?"rgba(255,80,80,0.14)":"rgba(76,175,80,0.14)",border:`1px solid ${selectedPlant.rarity==="Rare"?"#ff6464":"#4caf50"}`,color:selectedPlant.rarity==="Rare"?"#ff9999":"#a5d6a7",padding:"3px 13px",borderRadius:20,fontSize:"10px",letterSpacing:"0.1em"}}>{selectedPlant.rarity}</span>
                <button onClick={()=>{setSelectedPlant(null);setTab("overview");}} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.18)",color:"#888",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>✕</button>
              </div>
            </div>

            {/* Tabs */}
            <div style={{display:"flex",gap:5,marginBottom:20,borderBottom:"1px solid rgba(255,255,255,0.08)",paddingBottom:12}}>
              {["overview","history","science","future"].map(t=>(
                <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?`${selectedPlant.flowerColor}20`:"none",border:`1px solid ${tab===t?selectedPlant.flowerColor+"66":"rgba(255,255,255,0.1)"}`,color:tab===t?selectedPlant.flowerColor:"#81c784",padding:"5px 15px",borderRadius:20,fontSize:"10px",cursor:"pointer",letterSpacing:"0.09em",textTransform:"capitalize",transition:"all 0.18s"}}>{t}</button>
              ))}
            </div>

            {tab==="overview"&&(
              <div>
                <p style={{color:"#c8e6c9",fontSize:14,lineHeight:1.9,borderLeft:`3px solid ${selectedPlant.flowerColor}77`,paddingLeft:14,margin:"0 0 20px 0",fontStyle:"italic"}}>{selectedPlant.description}</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:20}}>
                  {[["🌍 Origin",selectedPlant.origin],["⏳ First Used",selectedPlant.era]].map(([k,v])=>(
                    <div key={k} style={{background:"rgba(255,255,255,0.05)",borderRadius:13,padding:"13px 15px",border:"1px solid rgba(255,255,255,0.08)"}}>
                      <div style={{fontSize:"9px",color:"#81c784",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>{k}</div>
                      <div style={{fontSize:13,color:"#e8f5e9"}}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:"9px",color:selectedPlant.flowerColor,letterSpacing:"0.2em",marginBottom:10,textTransform:"uppercase"}}>🌿 Medicinal Uses</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                  {selectedPlant.uses.map(u=>(<span key={u} style={{background:`${selectedPlant.flowerColor}1a`,border:`1px solid ${selectedPlant.flowerColor}44`,color:"#c8e6c9",padding:"5px 14px",borderRadius:20,fontSize:11.5}}>{u}</span>))}
                </div>
              </div>
            )}
            {tab==="history"&&(
              <div>
                <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:18}}>
                  <div style={{width:60,height:60,background:`${selectedPlant.flowerColor}1e`,border:`2px solid ${selectedPlant.flowerColor}55`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>⏳</div>
                  <div><div style={{color:"#81c784",fontSize:"9px",letterSpacing:"0.15em"}}>FIRST DOCUMENTED USE</div><div style={{color:"#f1f8e9",fontSize:22,fontWeight:"bold"}}>{selectedPlant.era}</div></div>
                </div>
                <div style={{background:"rgba(255,255,255,0.04)",borderRadius:13,padding:"14px 17px",marginBottom:13,border:"1px solid rgba(255,255,255,0.08)"}}>
                  <div style={{fontSize:"9px",color:"#81c784",letterSpacing:"0.15em",marginBottom:7}}>GEOGRAPHIC ORIGIN</div>
                  <div style={{color:"#c8e6c9",fontSize:13}}>{selectedPlant.origin}</div>
                </div>
                <div style={{background:"rgba(255,255,255,0.04)",borderRadius:13,padding:"14px 17px",border:"1px solid rgba(255,255,255,0.08)"}}>
                  <div style={{fontSize:"9px",color:"#81c784",letterSpacing:"0.15em",marginBottom:7}}>TRADITIONAL ROLE</div>
                  <div style={{color:"#c8e6c9",fontSize:13,lineHeight:1.85}}>{selectedPlant.description}</div>
                </div>
              </div>
            )}
            {tab==="science"&&(
              <div>
                <div style={{background:`${selectedPlant.flowerColor}12`,borderRadius:13,padding:"18px",border:`1px solid ${selectedPlant.flowerColor}33`,marginBottom:14}}>
                  <div style={{fontSize:"9px",color:selectedPlant.flowerColor,letterSpacing:"0.2em",marginBottom:8}}>🔬 PRIMARY ACTIVE COMPOUND</div>
                  <div style={{color:"#f1f8e9",fontSize:18,fontWeight:"bold"}}>{selectedPlant.compound}</div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {selectedPlant.uses.map(u=>(<div key={u} style={{background:"rgba(255,255,255,0.04)",borderRadius:11,padding:"10px 13px",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:8}}><span style={{color:selectedPlant.flowerColor,fontSize:13}}>◈</span><span style={{color:"#c8e6c9",fontSize:11.5}}>{u}</span></div>))}
                </div>
              </div>
            )}
            {tab==="future"&&(
              <div>
                <div style={{background:"rgba(255,255,255,0.04)",borderRadius:13,padding:"17px",border:"1px solid rgba(255,255,255,0.08)",marginBottom:13}}>
                  <div style={{fontSize:"9px",color:"#81c784",letterSpacing:"0.2em",marginBottom:9}}>💊 MODERN APPLICATIONS</div>
                  <div style={{color:"#c8e6c9",fontSize:13.5,lineHeight:1.9}}>{selectedPlant.modern}</div>
                </div>
                <div style={{background:`${selectedPlant.flowerColor}0c`,border:`1px solid ${selectedPlant.flowerColor}33`,borderRadius:13,padding:"17px",marginBottom:18}}>
                  <div style={{fontSize:"9px",color:selectedPlant.flowerColor,letterSpacing:"0.2em",marginBottom:8}}>🚀 STARTUP POTENTIAL</div>
                  <div style={{color:"#e8f5e9",fontSize:13,lineHeight:1.85}}><em>{selectedPlant.name}</em> presents high commercialization potential in nutraceuticals and pharmaceutical research. Government biotech grants applicable.</div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button style={{flex:1,background:`linear-gradient(135deg,${selectedPlant.flowerColor}2e,${selectedPlant.leafColor}1e)`,border:`1px solid ${selectedPlant.flowerColor}55`,color:"#f1f8e9",padding:"12px 0",borderRadius:13,cursor:"pointer",fontSize:12,letterSpacing:"0.07em"}}>📋 Register Startup</button>
                  <button style={{flex:1,background:"rgba(76,175,80,0.1)",border:"1px solid rgba(76,175,80,0.35)",color:"#a5d6a7",padding:"12px 0",borderRadius:13,cursor:"pointer",fontSize:12,letterSpacing:"0.07em"}}>🕰️ Time Capsule</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes panelIn{from{opacity:0;transform:scale(0.88) translateY(24px);}to{opacity:1;transform:scale(1) translateY(0);}}
        @keyframes breathe{0%,100%{opacity:0.88;transform:translateX(-50%) scale(1);}50%{opacity:1;transform:translateX(-50%) scale(1.032);}}
        @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        *{box-sizing:border-box;}
        input::placeholder{color:#3a6a3a;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:rgba(100,200,100,0.3);border-radius:2px;}
      `}</style>
    </div>
  );
}


