import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

const PLANTS = [
  { id:1,  name:"Aloe Vera",        sci:"Aloe barbadensis miller",   family:"Asphodelaceae",  uses:"Wound healing, burns, digestive soothing, skin hydration",         history:"Ancient Egyptians called it 'plant of immortality' – used for 6000 years in rituals and medicine",          modern:"Active in cosmetics, gels, sunburn creams, IBS supplements",           icon:"🌵", color:0x5a9e3f, type:"aloe",      h:1.1, w:0.7  },
  { id:2,  name:"Lavender",         sci:"Lavandula angustifolia",    family:"Lamiaceae",       uses:"Anxiety relief, insomnia, headaches, antiseptic wounds",            history:"Romans perfumed baths with it; medieval Europeans hung it to ward off plague",                            modern:"Aromatherapy, essential oils, calming supplements, sleep sprays",       icon:"💜", color:0x9b6fbf, type:"bush",       h:0.85,w:0.75 },
  { id:3,  name:"Chamomile",        sci:"Matricaria chamomilla",     family:"Asteraceae",      uses:"Relaxation, digestive relief, anti-inflammatory, skin soothing",   history:"Ancient Egypt dedicated chamomile to the sun god Ra; used in embalming pharaohs",                        modern:"Herbal teas, skincare serums, calming gummies",                        icon:"🌼", color:0xe8c53a, type:"flower",     h:0.55,w:0.5  },
  { id:4,  name:"Echinacea",        sci:"Echinacea purpurea",        family:"Asteraceae",      uses:"Immune boost, cold/flu prevention, anti-viral properties",          history:"Native Americans relied on it for 400+ years for infections and pain",                                   modern:"Cold supplements, immune tablets, syrup formulations",                 icon:"🌺", color:0xd45a8a, type:"flower",     h:0.8, w:0.55 },
  { id:5,  name:"Ginger",           sci:"Zingiber officinale",       family:"Zingiberaceae",   uses:"Nausea, digestion, joint pain, potent anti-inflammatory",           history:"Traded on the Silk Road 5000 years ago; key in Chinese and Ayurvedic medicine",                        modern:"Anti-nausea drugs, digestive aids, anti-arthritis research",           icon:"🫚", color:0xc07830, type:"herb",       h:0.65,w:0.85 },
  { id:6,  name:"Turmeric",         sci:"Curcuma longa",             family:"Zingiberaceae",   uses:"Anti-inflammatory, antioxidant, joint and liver health",            history:"Ayurvedic staple for 4000 years; golden colour sacred in Hindu rituals",                              modern:"Curcumin supplements, anti-cancer research, golden milk trend",        icon:"🟡", color:0xf0a020, type:"herb",       h:0.65,w:0.9  },
  { id:7,  name:"Peppermint",       sci:"Mentha × piperita",         family:"Lamiaceae",       uses:"IBS relief, headaches, respiratory clearing, topical pain relief",  history:"Found in Egyptian pyramids; ancient Greeks and Romans crowned themselves with mint",                     modern:"IBS capsules, topical pain gels, breath fresheners",                   icon:"🌿", color:0x2db870, type:"groundcover",h:0.35,w:0.6  },
  { id:8,  name:"St. John's Wort",  sci:"Hypericum perforatum",      family:"Hypericaceae",    uses:"Mild depression, anxiety, nerve pain, wound healing",               history:"Medieval monks called it devil's scourge; hung over doors on St. John's Day",                          modern:"OTC antidepressants, anxiety supplements, neuropathy research",        icon:"⭐", color:0xddb830, type:"bush",       h:0.7, w:0.55 },
  { id:9,  name:"Valerian",         sci:"Valeriana officinalis",     family:"Caprifoliaceae",  uses:"Insomnia, anxiety, muscle cramps, natural sedation",                history:"Ancient Greeks and Romans used it as perfume and sedative; Hippocrates documented it",                  modern:"Sleep supplements, anxiety capsules, non-habit forming sedatives",     icon:"🤍", color:0xd8d0c0, type:"bush",       h:1.0, w:0.5  },
  { id:10, name:"Ashwagandha",      sci:"Withania somnifera",        family:"Solanaceae",      uses:"Stress adaptogen, energy boost, cognitive function, testosterone",  history:"3000-year Ayurvedic horse herb for strength and vitality",                                             modern:"Adaptogen supplements, sports nutrition, cortisol blockers",           icon:"🌾", color:0xc07828, type:"bush",       h:0.9, w:0.75 },
  { id:11, name:"Neem",             sci:"Azadirachta indica",        family:"Meliaceae",       uses:"Antibacterial, antifungal, dental health, skin conditions",         history:"India's Village Pharmacy for 5000 years; sacred in Hinduism",                                         modern:"Toothpaste, bio-pesticides, antifungal skincare",                      icon:"🌳", color:0x2a7040, type:"tree",       h:3.2, w:1.7  },
  { id:12, name:"Holy Basil",       sci:"Ocimum tenuiflorum",        family:"Lamiaceae",       uses:"Stress relief, immune support, respiratory health, blood sugar",    history:"Sacred Tulsi of Hinduism; each home kept a plant for spiritual protection",                            modern:"Adaptogen teas, Ayurvedic formulations, anti-diabetic research",       icon:"🌱", color:0x28b870, type:"herb",       h:0.55,w:0.5  },
  { id:13, name:"Rosemary",         sci:"Salvia rosmarinus",         family:"Lamiaceae",       uses:"Memory boost, hair growth, circulation, antioxidant protection",    history:"Greek students wore garlands for better memory; symbolised remembrance at funerals",                    modern:"Cognitive supplements, hair serums, rosmarinic acid research",         icon:"🌿", color:0x3a8850, type:"bush",       h:0.85,w:0.65 },
  { id:14, name:"Milk Thistle",     sci:"Silybum marianum",          family:"Asteraceae",      uses:"Liver protection, detox, anti-inflammatory, antioxidant",           history:"Roman naturalist Pliny used it for liver complaints 2000 years ago",                                   modern:"Liver supplements, hepatitis support, silymarin extracts",             icon:"🔮", color:0x8844b8, type:"bush",       h:0.95,w:0.75 },
  { id:15, name:"Garlic",           sci:"Allium sativum",            family:"Amaryllidaceae",  uses:"Heart health, antibacterial, blood pressure, immune boost",         history:"Egyptian pyramid builders ate it for endurance; plague doctors carried it",                            modern:"Cardiovascular supplements, allicin research, antibiotic alternatives",icon:"🧄", color:0xe8e0c0, type:"herb",       h:0.45,w:0.4  },
  { id:16, name:"Elderberry",       sci:"Sambucus nigra",            family:"Adoxaceae",       uses:"Flu, antiviral, immune support, anti-inflammatory properties",      history:"Hippocrates called the elderberry his medicine chest 400 BC",                                         modern:"Antiviral syrups, gummies, COVID-19 research support",                 icon:"🫐", color:0x5a3880, type:"tree",       h:2.2, w:1.3  },
  { id:17, name:"Ginkgo",           sci:"Ginkgo biloba",             family:"Ginkgoaceae",     uses:"Memory enhancement, circulation, dementia prevention, antioxidant",  history:"270-million-year-old living fossil; survived the Hiroshima atomic blast",                              modern:"Cognitive supplements, dementia research, circulatory drugs",          icon:"🍃", color:0xc8a820, type:"tree",       h:3.5, w:1.6  },
  { id:18, name:"Passionflower",    sci:"Passiflora incarnata",      family:"Passifloraceae",  uses:"Anxiety reduction, insomnia, ADHD, nerve pain management",          history:"Aztecs and Native Americans used it as a sedative and pain reliever",                                  modern:"Anxiety capsules, sleep aids, ADHD natural alternatives",              icon:"🌸", color:0xb050d0, type:"flower",     h:0.75,w:1.0  },
  { id:19, name:"Calendula",        sci:"Calendula officinalis",     family:"Asteraceae",      uses:"Wound healing, skin inflammation, antifungal, eczema relief",       history:"Medieval Europe used marigold petals for fevers, wounds, and as food colouring",                       modern:"Wound gels, baby skincare, antifungal creams",                         icon:"🌻", color:0xf07020, type:"flower",     h:0.5, w:0.5  },
  { id:20, name:"Feverfew",         sci:"Tanacetum parthenium",      family:"Asteraceae",      uses:"Migraine prevention, fever reduction, arthritis, anti-inflammatory", history:"Ancient Greeks used it for headaches; called medieval aspirin by historians",                           modern:"Migraine prevention supplements, parthenolide research",               icon:"🌼", color:0xe8d040, type:"flower",     h:0.6, w:0.5  },
  { id:21, name:"Hawthorn",         sci:"Crataegus monogyna",        family:"Rosaceae",        uses:"Heart health, blood pressure, anxiety, circulation support",        history:"European medieval heart tonic; associated with fairies and May Day",                                  modern:"Cardiac supplements, hypertension research, flavonoid therapy",        icon:"❤️", color:0xd03838, type:"tree",       h:2.5, w:1.4  },
  { id:22, name:"Lemon Balm",       sci:"Melissa officinalis",       family:"Lamiaceae",       uses:"Anxiety, digestion, cold sores, sleep quality improvement",         history:"Avicenna prescribed it to make the heart merry in 11th-century Islamic medicine",                     modern:"Calming teas, antiviral lip creams, GABA receptor research",           icon:"🍋", color:0x90c840, type:"herb",       h:0.6, w:0.7  },
  { id:23, name:"Marshmallow Root", sci:"Althaea officinalis",       family:"Malvaceae",       uses:"Sore throat, GI lining protection, urinary tract, dry cough",       history:"Ancient Egyptians made throat lozenges from it; Romans used it for respiratory illness",             modern:"Throat syrups, gut-lining supplements, mucilage therapy",              icon:"🤍", color:0xf0e8d8, type:"herb",       h:1.0, w:0.65 },
  { id:24, name:"Oregano",          sci:"Origanum vulgare",          family:"Lamiaceae",       uses:"Antimicrobial, antioxidant, respiratory health, carvacrol benefits", history:"Greeks called it joy of the mountain; Aphrodite's symbol of happiness",                              modern:"Oregano oil supplements, carvacrol antimicrobial research",            icon:"🌿", color:0x4a9850, type:"groundcover",h:0.35,w:0.65 },
  { id:25, name:"Plantain",         sci:"Plantago major",            family:"Plantaginaceae",  uses:"Wound healing, cough relief, antibacterial, anti-itch properties",  history:"Native Americans called it White Man's Foot as it spread along colonial trails",                      modern:"Cough syrups, wound sprays, aucubin anti-inflammatory research",       icon:"🌱", color:0x38a040, type:"groundcover",h:0.25,w:0.5  },
  { id:26, name:"Red Clover",       sci:"Trifolium pratense",        family:"Fabaceae",        uses:"Menopause support, bone density, cholesterol, skin health",         history:"Traditional across Eurasia as fodder and healing herb for centuries",                                  modern:"Phytoestrogen supplements, HRT alternatives, bone health research",    icon:"🌸", color:0xd84878, type:"flower",     h:0.45,w:0.5  },
  { id:27, name:"Saw Palmetto",     sci:"Serenoa repens",            family:"Arecaceae",       uses:"Prostate health, hair loss prevention, testosterone balance",       history:"Seminole tribe of Florida used berries as food and reproductive medicine",                            modern:"Prostate supplements, DHT blocker hair loss products",                 icon:"🌴", color:0x48a048, type:"bush",       h:1.3, w:1.5  },
  { id:28, name:"Spearmint",        sci:"Mentha spicata",            family:"Lamiaceae",       uses:"Digestion, hormonal balance for PCOS, memory, hirsutism",           history:"Ancient Rome used spearmint at feasts to stimulate appetite",                                         modern:"PCOS research, digestive teas, anti-androgen studies",                 icon:"🌿", color:0x58d870, type:"groundcover",h:0.4, w:0.55 },
  { id:29, name:"Thyme",            sci:"Thymus vulgaris",           family:"Lamiaceae",       uses:"Bronchitis, antibacterial, cough relief, expectorant action",       history:"Egyptians used thyme in embalming; Greek soldiers bathed in it for courage",                          modern:"Respiratory syrups, thymol in mouthwash and antiseptics",              icon:"🌿", color:0x70b060, type:"groundcover",h:0.3, w:0.45 },
  { id:30, name:"Yarrow",           sci:"Achillea millefolium",      family:"Asteraceae",      uses:"Wound healing, blood pressure, fever reduction, anti-inflammatory",  history:"Named after Achilles who used it to stop bleeding of warrior wounds",                                 modern:"Wound care products, blood pressure research, achillin studies",       icon:"🌸", color:0xf8f0e8, type:"flower",     h:0.7, w:0.5  },
  { id:31, name:"Witch Hazel",      sci:"Hamamelis virginiana",      family:"Hamamelidaceae",  uses:"Skin toner, acne treatment, hemorrhoids, varicose veins",           history:"Native American tribes steamed witch hazel bark to reduce swelling and bruising",                     modern:"Astringent toners, hemorrhoid creams, anti-acne skincare",             icon:"🍂", color:0xc88830, type:"tree",       h:2.0, w:1.3  },
  { id:32, name:"Dandelion",        sci:"Taraxacum officinale",      family:"Asteraceae",      uses:"Liver detox, digestion support, diuretic, rich iron source",        history:"Mentioned in 10th-century Arab medicine by Ibn Sina as a liver tonic",                               modern:"Liver supplements, prebiotic teas, inulin fibre research",             icon:"🌼", color:0xf0d020, type:"flower",     h:0.3, w:0.4  },
  { id:33, name:"Cat's Claw",       sci:"Uncaria tomentosa",         family:"Rubiaceae",       uses:"Immune boost, arthritis, anti-viral, potential anti-tumour effects", history:"Peruvian Amazon tribes used vine bark for centuries for immune and joint health",                     modern:"Arthritis supplements, immune therapy, oxindole alkaloid research",    icon:"🌿", color:0x789060, type:"bush",       h:1.5, w:0.9  },
  { id:34, name:"Licorice Root",    sci:"Glycyrrhiza glabra",        family:"Fabaceae",        uses:"Sore throat, adrenal fatigue, gastric ulcers, anti-viral support",  history:"Found in Tutankhamun's tomb; Chinese emperors called it the great harmonizer",                       modern:"Throat lozenges, GI ulcer treatment, DGL supplements",                 icon:"🌾", color:0x9a7850, type:"bush",       h:0.85,w:0.7  },
  { id:35, name:"Stinging Nettle",  sci:"Urtica dioica",             family:"Urticaceae",      uses:"Allergies, arthritis, kidney health, rich iron supplementation",    history:"Bronze Age Europeans wove nettle fibres into fabric; Roman soldiers used it for warmth",            modern:"Allergy supplements, anti-arthritis, iron-rich cooking ingredient",    icon:"🌿", color:0x2a8838, type:"bush",       h:1.1, w:0.6  },
];

// Deterministic RNG
const rng = (() => { let s=42; return () => { s=(s*1664525+1013904223)>>>0; return s/0xffffffff; }; })();

function layoutPlants() {
  const slots = [];
  const rows = [
    {z:-22, xs:[-18,-13,-8,-3,2,7,12,17]},
    {z:-16, xs:[-16,-11,-6,-1,4,9,14]},
    {z:-10, xs:[-14,-9,-4,1,6,11,16]},
    {z:-4,  xs:[-12,-7,-2,3,8,13]},
    {z: 2,  xs:[-14,-9,-4,1,6,11,16]},
    {z: 8,  xs:[-16,-11,-6,-1,4,9]},
  ];
  for (const row of rows)
    for (const x of row.xs)
      slots.push({ x: x+(rng()-0.5)*3, z: row.z+(rng()-0.5)*2.5 });
  return slots;
}
const SLOTS = layoutPlants();

function sn(x,z) { // smooth noise for terrain
  return Math.sin(x*0.4)*0.14+Math.cos(z*0.3)*0.12+Math.sin(x*0.85+z*0.52)*0.07;
}

function buildScene(canvas) {
  const W=canvas.clientWidth, H=canvas.clientHeight;
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
  renderer.setSize(W,H);
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.2;
  renderer.outputColorSpace=THREE.SRGBColorSpace;

  const scene=new THREE.Scene();
  scene.background=new THREE.Color(0x85c5e8);
  scene.fog=new THREE.FogExp2(0xa0cfa0,0.019);

  const camera=new THREE.PerspectiveCamera(55,W/H,0.1,200);
  camera.position.set(0,5,14);

  // Lighting
  scene.add(new THREE.AmbientLight(0xfff5e0,0.6));
  const sun=new THREE.DirectionalLight(0xfff0b0,2.4);
  sun.position.set(30,55,18);
  sun.castShadow=true;
  sun.shadow.mapSize.set(4096,4096);
  sun.shadow.camera.near=1; sun.shadow.camera.far=130;
  sun.shadow.camera.left=-55; sun.shadow.camera.right=55;
  sun.shadow.camera.top=55; sun.shadow.camera.bottom=-55;
  sun.shadow.bias=-0.0003;
  scene.add(sun);
  scene.add(new THREE.HemisphereLight(0xb8e4ff,0x2d5c1e,0.6));
  const fill=new THREE.DirectionalLight(0xd0f0e0,0.3);
  fill.position.set(-20,15,-10); scene.add(fill);

  // Ground with vertex colours
  const gSz=100, gSg=80;
  const groundGeo=new THREE.PlaneGeometry(gSz,gSz,gSg,gSg);
  groundGeo.rotateX(-Math.PI/2);
  const gPos=groundGeo.attributes.position;
  const gCol=new Float32Array(gPos.count*3);
  const gPal=[new THREE.Color(0x3d8840),new THREE.Color(0x4a9e48),new THREE.Color(0x3a7a38),new THREE.Color(0x56a84f),new THREE.Color(0x307030)];
  for(let i=0;i<gPos.count;i++){
    const gx=gPos.getX(i),gz=gPos.getZ(i);
    gPos.setY(i,sn(gx,gz));
    const ci=Math.floor(Math.abs(Math.sin(gx*1.3+gz*0.9)*4.99))%5;
    gPal[ci].toArray(gCol,i*3);
  }
  groundGeo.setAttribute('color',new THREE.BufferAttribute(gCol,3));
  groundGeo.computeVertexNormals();
  const ground=new THREE.Mesh(groundGeo,new THREE.MeshLambertMaterial({vertexColors:true}));
  ground.receiveShadow=true; scene.add(ground);

  // Dirt path
  const pGeo=new THREE.PlaneGeometry(4,70,8,50); pGeo.rotateX(-Math.PI/2);
  const pPos=pGeo.attributes.position;
  for(let i=0;i<pPos.count;i++) pPos.setY(i,sn(pPos.getX(i),pPos.getZ(i))+0.01);
  pGeo.computeVertexNormals();
  const pathM=new THREE.Mesh(pGeo,new THREE.MeshLambertMaterial({color:0x8b7355}));
  pathM.position.set(0,0,-5); pathM.receiveShadow=true; scene.add(pathM);

  // Stepping stones
  const stoneMat=new THREE.MeshStandardMaterial({color:0xa09880,roughness:0.9,metalness:0.05});
  for(let i=-9;i<9;i++){
    const sg=new THREE.BoxGeometry(1.1+rng()*0.5,0.07+rng()*0.04,0.7+rng()*0.35);
    const sm=new THREE.Mesh(sg,stoneMat);
    sm.rotation.y=(rng()-0.5)*0.4;
    const sx=(rng()-0.5)*1.4, sz=i*1.9+(rng()-0.5)*0.4;
    sm.position.set(sx,sn(sx,sz)+0.04,sz);
    sm.receiveShadow=true; sm.castShadow=true; scene.add(sm);
  }

  // Mat cache
  const MC={};
  const mat=(c,r=0.85,m=0)=>{const k=`${c}_${r}`;return MC[k]||(MC[k]=new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m}));};
  const TRUNK=mat(0x5c3d1e,0.95); const DTRUNK=mat(0x3d2a10,0.95);

  // Plant builders
  function mkGroundCover(p,px,pz){
    const g=new THREE.Group();
    const lm=mat(p.color,0.8);
    for(let i=0;i<10+~~(rng()*6);i++){
      const a=rng()*Math.PI*2,r=rng()*p.w*0.5;
      const lh=0.15+rng()*0.18;
      const lmsh=new THREE.Mesh(new THREE.CylinderGeometry(0.01+rng()*0.025,0.025+rng()*0.02,lh,5),lm);
      lmsh.position.set(Math.cos(a)*r,lh/2,Math.sin(a)*r);
      lmsh.rotation.set((rng()-0.5)*0.7,rng()*Math.PI*2,(rng()-0.5)*0.7);
      lmsh.castShadow=true; g.add(lmsh);
    }
    g.position.set(px,sn(px,pz),pz); return g;
  }
  function mkFlower(p,px,pz){
    const g=new THREE.Group();
    const pm=mat(p.color,0.7),cm=mat(0xf0c010,0.65),sm=mat(0x2d8a44,0.85);
    const ns=2+~~(rng()*3);
    for(let s=0;s<ns;s++){
      const ox=(rng()-0.5)*p.w*0.5,oz=(rng()-0.5)*p.w*0.5;
      const sh=p.h*(0.6+rng()*0.4);
      const stem=new THREE.Mesh(new THREE.CylinderGeometry(0.015,0.025,sh,6),sm);
      stem.position.set(ox,sh/2,oz); stem.rotation.z=(rng()-0.5)*0.15; stem.castShadow=true; g.add(stem);
      const np=5+~~(rng()*4);
      for(let i=0;i<np;i++){
        const a=(i/np)*Math.PI*2;
        const pm2=new THREE.Mesh(new THREE.SphereGeometry(0.06+rng()*0.035,6,4),pm);
        pm2.position.set(ox+Math.cos(a)*0.1,sh+0.02,oz+Math.sin(a)*0.1);
        pm2.scale.set(1.2,0.5,1.2); pm2.castShadow=true; g.add(pm2);
      }
      const ctr=new THREE.Mesh(new THREE.SphereGeometry(0.055,7,6),cm);
      ctr.position.set(ox,sh+0.04,oz); g.add(ctr);
    }
    g.position.set(px,sn(px,pz),pz); return g;
  }
  function mkHerb(p,px,pz){
    const g=new THREE.Group();
    const lm=mat(p.color,0.8),sm=mat(0x3a6a28,0.9);
    const n=5+~~(rng()*5);
    for(let i=0;i<n;i++){
      const a=rng()*Math.PI*2,r=rng()*p.w*0.4;
      const bh=p.h*(0.5+rng()*0.5);
      const bm=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.03,bh,6),sm);
      bm.position.set(Math.cos(a)*r,bh/2,Math.sin(a)*r); bm.rotation.z=(rng()-0.5)*0.4; bm.castShadow=true; g.add(bm);
      const lf=new THREE.Mesh(new THREE.SphereGeometry(0.07+rng()*0.05,6,5),lm);
      lf.scale.set(1.5,0.5,1.5); lf.position.set(Math.cos(a)*r,bh,Math.sin(a)*r); lf.castShadow=true; g.add(lf);
    }
    g.position.set(px,sn(px,pz),pz); return g;
  }
  function mkAloe(p,px,pz){
    const g=new THREE.Group();
    const lm=mat(p.color,0.72);
    for(let i=0;i<12;i++){
      const a=(i/12)*Math.PI*2+rng()*0.3;
      const lh=p.h*(0.5+rng()*0.5);
      const lf=new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.07,lh,5),lm);
      lf.position.set(Math.cos(a)*0.12,lh/2,Math.sin(a)*0.12);
      lf.rotation.z=Math.cos(a)*0.6; lf.rotation.x=Math.sin(a)*0.6; lf.castShadow=true; g.add(lf);
    }
    g.position.set(px,sn(px,pz),pz); return g;
  }
  function mkBush(p,px,pz){
    const g=new THREE.Group();
    const lm=mat(p.color,0.82);
    const tk=new THREE.Mesh(new THREE.CylinderGeometry(p.w*0.07,p.w*0.13,p.h*0.3,7),TRUNK);
    tk.position.y=p.h*0.15; tk.castShadow=true; g.add(tk);
    for(let i=0;i<3+~~(rng()*4);i++){
      const a=rng()*Math.PI*2,r=rng()*p.w*0.3;
      const br=p.w*(0.28+rng()*0.18);
      const bm=new THREE.Mesh(new THREE.SphereGeometry(br,8,7),lm);
      bm.position.set(Math.cos(a)*r,p.h*(0.35+rng()*0.45),Math.sin(a)*r);
      bm.scale.y=0.82+rng()*0.3; bm.castShadow=true; g.add(bm);
    }
    g.position.set(px,sn(px,pz),pz); return g;
  }
  function mkTree(p,px,pz){
    const g=new THREE.Group();
    const lm=mat(p.color,0.85);
    const tH=p.h*0.42;
    const tk=new THREE.Mesh(new THREE.CylinderGeometry(p.w*0.07,p.w*0.16,tH,8),DTRUNK);
    tk.position.y=tH/2; tk.castShadow=true; g.add(tk);
    for(let l=0;l<3;l++){
      const lh=p.h*(0.38+l*0.05), lr=p.w*(0.52-l*0.09);
      const layer=new THREE.Mesh(new THREE.ConeGeometry(lr,lh,10+l*2),lm);
      layer.position.y=tH+l*p.h*0.19+lh/2-0.18; layer.castShadow=true; g.add(layer);
    }
    g.position.set(px,sn(px,pz),pz); return g;
  }

  // Place plants + rings
  const plantMeshes=[], plantPositions=[], ringMeshes=[];
  PLANTS.forEach((p,i)=>{
    if(i>=SLOTS.length) return;
    const {x,z}=SLOTS[i];
    let mesh;
    if(p.type==="tree")       mesh=mkTree(p,x,z);
    else if(p.type==="bush")  mesh=mkBush(p,x,z);
    else if(p.type==="flower")mesh=mkFlower(p,x,z);
    else if(p.type==="herb")  mesh=mkHerb(p,x,z);
    else if(p.type==="aloe")  mesh=mkAloe(p,x,z);
    else                       mesh=mkGroundCover(p,x,z);
    mesh.userData={plantId:p.id,plantIndex:i};
    mesh.traverse(c=>{if(c.isMesh){c.castShadow=true;c.receiveShadow=true;c.userData.plantId=p.id;c.userData.plantIndex=i;}});
    scene.add(mesh); plantMeshes.push(mesh);
    plantPositions.push(new THREE.Vector3(x,0,z));
    const rg=new THREE.Mesh(new THREE.RingGeometry(0.55,0.73,32),new THREE.MeshBasicMaterial({color:p.color,transparent:true,opacity:0,side:THREE.DoubleSide}));
    rg.rotation.x=-Math.PI/2; rg.position.set(x,sn(x,z)+0.06,z);
    scene.add(rg); ringMeshes.push(rg);
  });

  // Pebbles + mushrooms
  const pebMat=mat(0x9e8c7a,0.92), mCapA=mat(0xcc3300,0.78), mCapB=mat(0xe86010,0.78), mStem=mat(0xf5e0b0,0.75);
  PLANTS.forEach((_,i)=>{
    if(i>=SLOTS.length) return;
    const {x,z}=SLOTS[i];
    for(let p=0;p<3+~~(rng()*6);p++){
      const a=rng()*Math.PI*2,r=0.35+rng()*0.7,ps=0.04+rng()*0.09;
      const pm=new THREE.Mesh(new THREE.SphereGeometry(ps,5,4),pebMat);
      const px2=x+Math.cos(a)*r,pz2=z+Math.sin(a)*r;
      pm.position.set(px2,sn(px2,pz2)+ps*0.35,pz2); pm.scale.set(1+rng()*0.5,0.35+rng()*0.5,1+rng()*0.5); pm.castShadow=true; scene.add(pm);
    }
    if(rng()<0.42){
      const na=rng()*Math.PI*2,nr=0.5+rng()*0.4,mx=x+Math.cos(na)*nr,mz2=z+Math.sin(na)*nr,sh=0.1+rng()*0.12;
      const stm=new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.04,sh,7),mStem);
      stm.position.set(mx,sn(mx,mz2)+sh/2,mz2); stm.castShadow=true; scene.add(stm);
      const cap=new THREE.Mesh(new THREE.SphereGeometry(0.08+rng()*0.06,9,6,0,Math.PI*2,0,Math.PI*0.58),rng()<0.5?mCapA:mCapB);
      cap.position.set(mx,sn(mx,mz2)+sh+0.01,mz2); cap.castShadow=true; scene.add(cap);
    }
  });

  // Border + backdrop trees
  const btMats=[mat(0x1a5a22,0.9),mat(0x0f3d18,0.9),mat(0x2d6e30,0.9)];
  for(const s of[-26,26])
    for(let i=-14;i<=14;i++){
      const th=5+rng()*8,tr=1.3+rng()*1.2;
      const cm=new THREE.Mesh(new THREE.ConeGeometry(tr,th,8),btMats[~~(rng()*3)]);
      const bpx=s,bpz=i*3.5+(rng()-0.5)*2; cm.position.set(bpx,sn(bpx,bpz)+th/2-0.5,bpz); cm.castShadow=true; scene.add(cm);
      const tk=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.22,1.2,7),DTRUNK); tk.position.set(bpx,sn(bpx,bpz)+0.6,bpz); scene.add(tk);
    }
  for(const s of[-26,26])
    for(let i=-14;i<=14;i++){
      const th=5+rng()*8,tr=1.3+rng()*1.2;
      const cm=new THREE.Mesh(new THREE.ConeGeometry(tr,th,8),btMats[~~(rng()*3)]);
      const bpx=i*3.5+(rng()-0.5)*2,bpz=s; cm.position.set(bpx,sn(bpx,bpz)+th/2-0.5,bpz); cm.castShadow=true; scene.add(cm);
    }
  for(let i=-10;i<=10;i++){
    const th=10+rng()*12,tr=2.2+rng()*2;
    const cm=new THREE.Mesh(new THREE.ConeGeometry(tr,th,7),mat(0x0d3010,0.95)); cm.position.set(i*6+(rng()-0.5)*4,th/2-1,-40); scene.add(cm);
  }

  // Clouds
  const cloudM=new THREE.MeshStandardMaterial({color:0xffffff,roughness:1,metalness:0});
  for(let i=0;i<16;i++){
    const cg=new THREE.Group();
    for(let j=0;j<3+~~(rng()*4);j++){
      const sm=new THREE.Mesh(new THREE.SphereGeometry(2.5+rng()*2,7,5),cloudM);
      sm.position.set(j*3.5+(rng()-0.5)*2,(rng()-0.5)*1.5,0); sm.scale.set(1+rng()*0.5,0.5+rng()*0.3,0.8+rng()*0.4); cg.add(sm);
    }
    cg.position.set(-40+rng()*80,28+rng()*14,-30+rng()*12); scene.add(cg);
  }

  // ── Character (armored soldier) ──────────────────────────────────────────
  const charGroup=new THREE.Group();
  const aLight=new THREE.MeshStandardMaterial({color:0xd4b896,roughness:0.62,metalness:0.18});
  const aDark =new THREE.MeshStandardMaterial({color:0xb89870,roughness:0.68,metalness:0.12});
  const dkMet =new THREE.MeshStandardMaterial({color:0x1a2530,roughness:0.55,metalness:0.45});
  const redAcc=new THREE.MeshStandardMaterial({color:0xcc2020,roughness:0.65,metalness:0.08});
  const bootM =new THREE.MeshStandardMaterial({color:0x1a1a1a,roughness:0.8, metalness:0.05});
  const beltM =new THREE.MeshStandardMaterial({color:0x4a3020,roughness:0.9, metalness:0.0 });
  const greenM=new THREE.MeshStandardMaterial({color:0x2a4428,roughness:0.88,metalness:0.05});

  const BX=(w,h,d,m,px,py,pz)=>{const ms=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);ms.position.set(px,py,pz);ms.castShadow=true;return ms;};
  const CY=(rt,rb,h,seg,m,px,py,pz)=>{const ms=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg),m);ms.position.set(px,py,pz);ms.castShadow=true;return ms;};

  // Legs
  const lLG=new THREE.Group(); lLG.position.set(-0.115,0.75,0);
  lLG.add(BX(0.13,0.38,0.15,aLight,0,-0.19,0)); lLG.add(BX(0.16,0.11,0.19,aDark,0,-0.36,0)); lLG.add(BX(0.14,0.2,0.22,bootM,0,-0.55,0.02)); charGroup.add(lLG);
  const rLG=new THREE.Group(); rLG.position.set(0.115,0.75,0);
  rLG.add(BX(0.13,0.38,0.15,aLight,0,-0.19,0)); rLG.add(BX(0.16,0.11,0.19,aDark,0,-0.36,0)); rLG.add(BX(0.14,0.2,0.22,bootM,0,-0.55,0.02)); charGroup.add(rLG);

  // Waist
  charGroup.add(BX(0.41,0.09,0.25,beltM,0,0.77,0)); charGroup.add(BX(0.08,0.1,0.1,beltM,0.22,0.76,0.1));

  // Torso
  charGroup.add(BX(0.38,0.44,0.22,aLight,0,1.05,0));
  charGroup.add(BX(0.26,0.26,0.13,aDark,0,1.06,0.12));
  charGroup.add(BX(0.055,0.22,0.14,redAcc,0.09,1.06,0.12));
  charGroup.add(BX(0.055,0.22,0.14,redAcc,-0.09,1.06,0.12));
  charGroup.add(BX(0.28,0.32,0.13,aDark,0,1.05,-0.17));
  charGroup.add(CY(0.025,0.025,0.38,6,dkMet,0.08,1.22,-0.18));
  charGroup.add(CY(0.025,0.025,0.38,6,dkMet,-0.08,1.22,-0.18));

  // Shoulders
  charGroup.add(BX(0.17,0.16,0.21,aLight,-0.27,1.2,0)); charGroup.add(BX(0.17,0.16,0.21,aLight,0.27,1.2,0));

  // Arms
  const lAG=new THREE.Group(); lAG.position.set(-0.27,1.04,0);
  lAG.add(BX(0.1,0.36,0.12,aLight,0,-0.18,0)); lAG.add(BX(0.1,0.17,0.13,greenM,0,-0.42,0)); lAG.add(BX(0.1,0.11,0.11,dkMet,0,-0.57,0)); charGroup.add(lAG);
  const rAG=new THREE.Group(); rAG.position.set(0.27,1.04,0);
  rAG.add(BX(0.1,0.36,0.12,aLight,0,-0.18,0)); rAG.add(BX(0.1,0.17,0.13,greenM,0,-0.42,0)); rAG.add(BX(0.1,0.11,0.11,dkMet,0,-0.57,0)); charGroup.add(rAG);

  // Head
  charGroup.add(BX(0.31,0.31,0.31,aLight,0,1.42,0));
  charGroup.add(BX(0.265,0.115,0.07,dkMet,0,1.40,0.165));
  charGroup.add(BX(0.04,0.29,0.12,redAcc,0,1.42,-0.1));
  charGroup.add(BX(0.05,0.19,0.19,aDark,-0.185,1.42,0));
  charGroup.add(BX(0.05,0.19,0.19,aDark,0.185,1.42,0));
  charGroup.add(BX(0.06,0.06,0.07,dkMet,0.11,1.61,0));

  charGroup.position.set(0,0,8); charGroup.rotation.y=Math.PI; scene.add(charGroup);

  const raycaster=new THREE.Raycaster();
  const mouse=new THREE.Vector2();

  const state={
    pos:new THREE.Vector3(0,0,8), charAngle:Math.PI,
    keys:{}, mode:"idle", animTime:0,
    camYaw:0, camDist:11, camPitch:0.38,
    camTarget:new THREE.Vector3(0,1.2,8),
    nearbyPlant:null, plantMeshes, plantPositions, ringMeshes,
  };

  return {renderer,scene,camera,charGroup,lLG,rLG,lAG,rAG,raycaster,mouse,state};
}

// ── Minimap ──────────────────────────────────────────────────────────────────
function MiniMap({playerPos}) {
  const cvs=useRef(null);
  useEffect(()=>{
    const c=cvs.current; if(!c) return;
    const ctx=c.getContext("2d"); const W=c.width,H=c.height;
    const sc=W/56,cx=W/2,cz=H/2;
    const wx=x=>cx+x*sc, wz=z=>cz+z*sc;
    ctx.clearRect(0,0,W,H);
    ctx.save(); ctx.beginPath(); ctx.arc(W/2,H/2,W/2,0,Math.PI*2); ctx.clip();
    ctx.fillStyle="#0d2210"; ctx.fillRect(0,0,W,H);
    ctx.fillStyle="#6b554080"; ctx.fillRect(cx-3.5*sc,0,7*sc,H);
    PLANTS.forEach((p,i)=>{
      if(i>=SLOTS.length) return;
      const {x,z}=SLOTS[i];
      ctx.fillStyle=`#${p.color.toString(16).padStart(6,"0")}`;
      const r=p.type==="tree"?3.5:p.type==="bush"?2.5:2;
      ctx.beginPath(); ctx.arc(wx(x),wz(z),r,0,Math.PI*2); ctx.fill();
    });
    if(playerPos){
      ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(wx(playerPos.x),wz(playerPos.z),4,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#4caf50"; ctx.beginPath(); ctx.arc(wx(playerPos.x),wz(playerPos.z),2.8,0,Math.PI*2); ctx.fill();
    }
    ctx.strokeStyle="rgba(76,175,80,0.55)"; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(W/2,H/2,W/2-1,0,Math.PI*2); ctx.stroke();
    ctx.restore();
  });
  return <canvas ref={cvs} width={112} height={112} style={{display:"block"}} />;
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function ViridyanGarden() {
  const canvasRef=useRef(null), sceneRef=useRef(null), frameRef=useRef(null);
  const camYawRef=useRef(0);
  const [selPlant,setSelPlant]=useState(null);
  const [nearby,setNearby]=useState(null);
  const [mode,setMode]=useState("idle");
  const [pos,setPos]=useState({x:0,z:8});
  const [intro,setIntro]=useState(true);

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const refs=buildScene(canvas); sceneRef.current=refs;
    const {renderer,scene,camera,charGroup,lLG,rLG,lAG,rAG,raycaster,mouse,state}=refs;

    const onKD=e=>{state.keys[e.code]=true;};
    const onKU=e=>{state.keys[e.code]=false;};
    window.addEventListener("keydown",onKD); window.addEventListener("keyup",onKU);

    let drag=false,lmx=0;
    canvas.addEventListener("mousedown",e=>{drag=true;lmx=e.clientX;});
    canvas.addEventListener("mousemove",e=>{if(!drag)return;camYawRef.current+=(e.clientX-lmx)*0.008;state.camYaw=camYawRef.current;lmx=e.clientX;});
    canvas.addEventListener("mouseup",()=>drag=false);
    canvas.addEventListener("mouseleave",()=>drag=false);

    canvas.addEventListener("click",e=>{
      const rect=canvas.getBoundingClientRect();
      mouse.x=((e.clientX-rect.left)/rect.width)*2-1;
      mouse.y=-((e.clientY-rect.top)/rect.height)*2+1;
      raycaster.setFromCamera(mouse,camera);
      const hits=raycaster.intersectObjects(scene.children,true);
      for(const h of hits){
        let o=h.object; while(o&&!o.userData.plantId) o=o.parent;
        if(o&&o.userData.plantId){const pl=PLANTS.find(p=>p.id===o.userData.plantId);if(pl){setSelPlant(pl);return;}}
      }
    });

    const onResize=()=>{const W=canvas.clientWidth,H=canvas.clientHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();};
    window.addEventListener("resize",onResize);

    let pT=performance.now();
    const tick=()=>{
      frameRef.current=requestAnimationFrame(tick);
      const now=performance.now(),dt=Math.min((now-pT)/1000,0.05); pT=now;
      state.animTime+=dt; const t=state.animTime;
      const {keys}=state;
      const sprint=keys.ShiftLeft||keys.ShiftRight;
      const spd=sprint?7.5:4;
      let dx=0,dz=0,mv=false;
      if(keys.KeyW||keys.ArrowUp){dz=-1;mv=true;}
      if(keys.KeyS||keys.ArrowDown){dz=1;mv=true;}
      if(keys.KeyA||keys.ArrowLeft){dx=-1;mv=true;}
      if(keys.KeyD||keys.ArrowRight){dx=1;mv=true;}
      if(keys.KeyQ){state.camYaw-=dt*1.9;camYawRef.current=state.camYaw;}
      if(keys.KeyE){state.camYaw+=dt*1.9;camYawRef.current=state.camYaw;}

      const nm=mv?(sprint?"run":"walk"):"idle";
      if(nm!==state.mode){state.mode=nm;setMode(nm);}

      if(mv){
        const wdx=dx*Math.cos(state.camYaw)+dz*Math.sin(state.camYaw);
        const wdz=-dx*Math.sin(state.camYaw)+dz*Math.cos(state.camYaw);
        const len=Math.sqrt(wdx*wdx+wdz*wdz)||1;
        const tA=Math.atan2(wdx/len,wdz/len);
        let df=tA-state.charAngle; while(df>Math.PI)df-=Math.PI*2; while(df<-Math.PI)df+=Math.PI*2;
        state.charAngle+=df*Math.min(dt*14,1);
        state.pos.x=Math.max(-21,Math.min(21,state.pos.x+(wdx/len)*spd*dt));
        state.pos.z=Math.max(-23,Math.min(12,state.pos.z+(wdz/len)*spd*dt));
      }

      const gy=sn(state.pos.x,state.pos.z);
      charGroup.position.set(state.pos.x,gy,state.pos.z);
      charGroup.rotation.y=state.charAngle;

      const freq=nm==="run"?9:nm==="walk"?5.5:1.2;
      const amp=nm==="run"?0.95:nm==="walk"?0.6:0.04;
      lLG.rotation.x=Math.sin(t*freq)*amp; rLG.rotation.x=-Math.sin(t*freq)*amp;
      lAG.rotation.x=-Math.sin(t*freq)*amp*0.55; rAG.rotation.x=Math.sin(t*freq)*amp*0.55;
      charGroup.position.y+=nm!=="idle"?Math.abs(Math.sin(t*freq*2))*0.065:Math.sin(t*1.2)*0.009;

      // Camera
      const camX=state.pos.x+Math.sin(state.camYaw)*state.camDist;
      const camZ=state.pos.z+Math.cos(state.camYaw)*state.camDist;
      const camY=gy+5+state.camPitch*state.camDist*0.55;
      camera.position.lerp(new THREE.Vector3(camX,camY,camZ),dt*7);
      state.camTarget.lerp(new THREE.Vector3(state.pos.x,gy+1.2,state.pos.z),dt*8);
      camera.lookAt(state.camTarget);

      // Proximity + rings
      let closest=null,closestD=Infinity;
      state.plantPositions.forEach((pp,i)=>{
        const d=state.pos.distanceTo(pp);
        if(d<3.5&&d<closestD){closest=i;closestD=d;}
        const ring=state.ringMeshes[i];
        if(ring){
          const tgt=(i===closest&&d<3.5)?0.78:0;
          ring.material.opacity+=(tgt-ring.material.opacity)*dt*9;
          ring.rotation.z+=dt*(i%2===0?0.9:-0.9);
        }
      });
      const np=closest!==null?PLANTS[closest]:null;
      if(np?.id!==state.nearbyPlant?.id){state.nearbyPlant=np;setNearby(np);}
      setPos({x:state.pos.x,z:state.pos.z});
      renderer.render(scene,camera);
    };
    tick();

    return ()=>{
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("keydown",onKD); window.removeEventListener("keyup",onKU);
      window.removeEventListener("resize",onResize); renderer.dispose();
    };
  },[]);

  const pk=c=>{if(sceneRef.current)sceneRef.current.state.keys[c]=true;};
  const rk=c=>{if(sceneRef.current)sceneRef.current.state.keys[c]=false;};

  return (
    <div style={{width:"100vw",height:"100vh",overflow:"hidden",position:"relative",background:"#060f06",
      fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,serif"}}>
      <canvas ref={canvasRef} style={{width:"100%",height:"100%",display:"block",cursor:"crosshair"}} />

      {/* Top Nav */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:58,
        background:"linear-gradient(180deg,rgba(4,14,4,0.93) 0%,transparent 100%)",
        display:"flex",alignItems:"center",padding:"0 22px",justifyContent:"space-between",
        pointerEvents:"none",zIndex:5}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,#6dca6d,#1a6020)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,
            boxShadow:"0 0 14px rgba(77,175,80,0.7)"}}>🌿</div>
          <div>
            <div style={{color:"#c8e6c9",fontSize:19,fontWeight:700,letterSpacing:4,lineHeight:1}}>VIRIDYAN</div>
            <div style={{color:"#81c784",fontSize:9,letterSpacing:6,opacity:0.7}}>DIGITAL GARDEN</div>
          </div>
        </div>
        <div style={{display:"flex",gap:26,alignItems:"center"}}>
          {["EXPLORE","TIME CAPSULE","STARTUP","COMMUNITY","FUTURE IMPACT"].map(n=>(
            <div key={n} style={{color:"rgba(190,230,190,0.5)",fontSize:10,letterSpacing:2.5,cursor:"pointer"}}>{n}</div>
          ))}
        </div>
        <div style={{color:"#81c784",fontSize:11,letterSpacing:3,textTransform:"uppercase",opacity:0.85}}>
          {mode==="idle"?"● IDLE":mode==="walk"?"▶ WALKING":"▶▶ RUNNING"}
        </div>
      </div>

      {/* Controls hint */}
      <div style={{position:"absolute",bottom:20,left:20,color:"rgba(150,205,150,0.7)",
        fontSize:11,letterSpacing:1.4,lineHeight:2.2,textShadow:"0 1px 5px rgba(0,0,0,0.9)",pointerEvents:"none"}}>
        <div style={{color:"rgba(90,160,90,0.55)",fontSize:9,letterSpacing:3,marginBottom:4}}>CONTROLS</div>
        <div>WASD · Move &nbsp;|&nbsp; Shift · Run &nbsp;|&nbsp; Q/E · Rotate Camera</div>
        <div>Click plant to inspect &nbsp;|&nbsp; Drag to orbit</div>
      </div>

      {/* Nearby toast */}
      {nearby&&!selPlant&&(
        <div onClick={()=>setSelPlant(nearby)} style={{
          position:"absolute",bottom:70,left:"50%",transform:"translateX(-50%)",
          background:"rgba(6,18,6,0.9)",border:"1px solid rgba(76,175,80,0.6)",
          borderRadius:30,padding:"10px 26px",display:"flex",alignItems:"center",gap:12,
          backdropFilter:"blur(14px)",boxShadow:"0 4px 28px rgba(0,0,0,0.55)",
          cursor:"pointer",zIndex:6,animation:"fadeUp 0.3s ease",pointerEvents:"all"}}>
          <span style={{fontSize:20}}>{nearby.icon}</span>
          <span style={{color:"#c8e6c9",fontSize:13}}>Near <strong style={{color:"#81c784"}}>{nearby.name}</strong></span>
          <span style={{color:"rgba(110,175,110,0.6)",fontSize:11}}>— Click to learn more</span>
        </div>
      )}

      {/* Minimap */}
      <div style={{position:"absolute",bottom:20,right:20,
        background:"rgba(4,12,4,0.88)",borderRadius:"50%",
        border:"2px solid rgba(76,175,80,0.4)",overflow:"hidden",
        boxShadow:"0 4px 22px rgba(0,0,0,0.65)"}}>
        <div style={{position:"absolute",top:5,left:0,right:0,textAlign:"center",
          color:"rgba(120,195,120,0.65)",fontSize:8,letterSpacing:3,zIndex:2,pointerEvents:"none"}}>MAP</div>
        <MiniMap playerPos={pos} />
      </div>

      {/* Touch D-pad */}
      <div style={{position:"absolute",bottom:148,right:22,width:130,height:130,userSelect:"none"}}>
        {[{l:"▲",c:"KeyW",t:0,x:46},{l:"◄",c:"KeyA",t:46,x:0},{l:"▼",c:"KeyS",t:92,x:46},{l:"►",c:"KeyD",t:46,x:92}].map(b=>(
          <button key={b.c} onPointerDown={()=>pk(b.c)} onPointerUp={()=>rk(b.c)} onPointerLeave={()=>rk(b.c)}
            style={{position:"absolute",top:b.t,left:b.x,width:38,height:38,borderRadius:9,
              background:"rgba(6,20,6,0.82)",border:"1px solid rgba(76,175,80,0.38)",
              color:"#a5d6a7",fontSize:15,cursor:"pointer",userSelect:"none",touchAction:"none",
              display:"flex",alignItems:"center",justifyContent:"center"}}>{b.l}</button>
        ))}
      </div>

      {/* Plant Panel */}
      {selPlant&&(
        <div onClick={()=>setSelPlant(null)} style={{
          position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
          background:"rgba(0,0,0,0.6)",backdropFilter:"blur(7px)",zIndex:20,animation:"fadeIn 0.22s ease"}}>
          <div onClick={e=>e.stopPropagation()} style={{
            background:"linear-gradient(150deg,rgba(4,16,4,0.98) 0%,rgba(10,26,10,0.98) 100%)",
            border:"1px solid rgba(76,175,80,0.38)",borderRadius:24,
            padding:"40px 38px 32px",maxWidth:520,width:"90vw",
            boxShadow:"0 28px 90px rgba(0,0,0,0.85),inset 0 1px 0 rgba(255,255,255,0.04)",
            position:"relative"}}>
            <div style={{position:"absolute",top:0,left:38,right:38,height:2,
              background:`linear-gradient(90deg,transparent,#${selPlant.color.toString(16).padStart(6,"0")},transparent)`,borderRadius:2}}/>
            <button onClick={()=>setSelPlant(null)} style={{position:"absolute",top:14,right:14,
              width:30,height:30,borderRadius:"50%",
              background:"rgba(76,175,80,0.1)",border:"1px solid rgba(76,175,80,0.28)",
              color:"#81c784",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            <div style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:22}}>
              <div style={{fontSize:52,lineHeight:1,filter:`drop-shadow(0 0 14px #${selPlant.color.toString(16).padStart(6,"0")}99)`}}>{selPlant.icon}</div>
              <div>
                <div style={{color:"#c8e6c9",fontSize:25,fontWeight:700,lineHeight:1.1,marginBottom:5}}>{selPlant.name}</div>
                <div style={{color:"#66bb6a",fontSize:12,fontStyle:"italic",marginBottom:7}}>{selPlant.sci}</div>
                <div style={{display:"inline-block",background:"rgba(76,175,80,0.1)",border:"1px solid rgba(76,175,80,0.22)",
                  borderRadius:20,padding:"2px 12px",color:"#4caf50",fontSize:10,letterSpacing:2}}>{selPlant.family}</div>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:11}}>
              {[
                {lbl:"MEDICINAL USES",     txt:selPlant.uses,    ic:"🌿",cl:"#a5d6a7"},
                {lbl:"HISTORICAL CONTEXT", txt:selPlant.history, ic:"📜",cl:"#90caf9"},
                {lbl:"MODERN APPLICATIONS",txt:selPlant.modern,  ic:"🔬",cl:"#ce93d8"},
              ].map(r=>(
                <div key={r.lbl} style={{background:"rgba(255,255,255,0.028)",borderRadius:13,
                  padding:"13px 15px",border:"1px solid rgba(255,255,255,0.046)"}}>
                  <div style={{color:"rgba(76,175,80,0.65)",fontSize:9,letterSpacing:3,marginBottom:5}}>{r.ic} {r.lbl}</div>
                  <div style={{color:r.cl,fontSize:13.5,lineHeight:1.7}}>{r.txt}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:20,display:"flex",justifyContent:"flex-end"}}>
              <button onClick={()=>setSelPlant(null)} style={{
                background:"linear-gradient(135deg,#1b5e20,#2e7d32)",
                color:"#c8e6c9",border:"none",borderRadius:30,
                padding:"10px 26px",fontSize:11,letterSpacing:2.5,cursor:"pointer",
                boxShadow:"0 4px 18px rgba(46,125,50,0.45)"}}>CONTINUE EXPLORING →</button>
            </div>
          </div>
        </div>
      )}

      {/* Intro */}
      {intro&&(
        <div style={{position:"absolute",inset:0,background:"rgba(0,4,0,0.9)",
          display:"flex",alignItems:"center",justifyContent:"center",
          backdropFilter:"blur(10px)",zIndex:30}}>
          <div style={{textAlign:"center",maxWidth:480,padding:"48px 40px",
            background:"rgba(4,16,4,0.97)",borderRadius:26,
            border:"1px solid rgba(76,175,80,0.32)",
            boxShadow:"0 0 80px rgba(76,175,80,0.08),0 28px 90px rgba(0,0,0,0.8)"}}>
            <div style={{fontSize:54,marginBottom:14,filter:"drop-shadow(0 0 22px rgba(100,200,100,0.55))"}}>🌿</div>
            <div style={{color:"#c8e6c9",fontSize:27,fontWeight:700,letterSpacing:5,marginBottom:6}}>VIRIDYAN</div>
            <div style={{color:"#66bb6a",fontSize:10,letterSpacing:8,marginBottom:24,opacity:0.75}}>DIGITAL MEDICINAL GARDEN</div>
            <div style={{color:"rgba(175,220,175,0.85)",fontSize:14,lineHeight:2,marginBottom:26}}>
              Explore a living garden of <strong style={{color:"#a5d6a7"}}>35 medicinal plant species</strong>.<br/>
              Walk among them, discover ancient stories,<br/>and unlock the science behind each leaf.
            </div>
            <div style={{background:"rgba(76,175,80,0.07)",borderRadius:14,padding:"14px 20px",
              marginBottom:26,border:"1px solid rgba(76,175,80,0.13)"}}>
              <div style={{color:"rgba(90,155,90,0.65)",fontSize:9,letterSpacing:3,marginBottom:10}}>CONTROLS</div>
              {[["W A S D","Move"],["SHIFT","Sprint / Run"],["Q / E","Rotate camera"],["DRAG","Orbit view"],["CLICK","Inspect plant"]].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{background:"rgba(76,175,80,0.14)",color:"#81c784",padding:"2px 10px",borderRadius:6,fontSize:11,fontFamily:"monospace"}}>{k}</span>
                  <span style={{color:"rgba(155,210,155,0.7)",fontSize:11}}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>setIntro(false)} style={{
              background:"linear-gradient(135deg,#1b5e20,#388e3c)",
              color:"#e8f5e9",border:"none",borderRadius:30,
              padding:"14px 40px",fontSize:13,letterSpacing:3,cursor:"pointer",fontWeight:700,
              boxShadow:"0 6px 30px rgba(46,125,50,0.55)"}}>ENTER THE GARDEN</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translate(-50%,10px)}to{opacity:1;transform:translateX(-50%)}}
        *{box-sizing:border-box} button:active{transform:scale(0.94)}
      `}</style>
    </div>
  );
}