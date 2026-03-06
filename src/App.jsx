import { useState } from "react";

const SAVE_KEY = "wof_save_v1";
const loadSave = () => { try { const d = localStorage.getItem(SAVE_KEY); return d ? JSON.parse(d) : null; } catch { return null; } };
const writeSave = (data) => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(data)); } catch {} };
const clearSave = () => { try { localStorage.removeItem(SAVE_KEY); } catch {} };

const M_CFG = [
  { key:"militarism",  label:"Militarism",  color:"#C41E1E", desc:"Military buildup & aggression" },
  { key:"alliances",   label:"Alliances",   color:"#4A7FC1", desc:"Stability of alliance networks" },
  { key:"imperialism", label:"Imperialism", color:"#C9A54C", desc:"Colonial & imperial tensions" },
  { key:"nationalism", label:"Nationalism", color:"#4E9A5E", desc:"Ethnic & nationalist pressures" },
];
const INIT_METERS = { militarism:22, alliances:38, imperialism:18, nationalism:28 };

const ALL_CHAPTER_META = [
  { num:"I",   title:"The Powder Keg",   std:"10.4a",       topic:"Causes of WWI & MAIN Framework",  color:"#8B1A1A" },
  { num:"II",  title:"The Spark",        std:"10.4a–10.4b", topic:"Assassination & Alliance Chain",   color:"#7A3B00" },
  { num:"III", title:"The Trenches",     std:"10.4b–10.4c", topic:"Total War & New Weapons",          color:"#2C4A1E" },
  { num:"IV",  title:"The Home Front",   std:"10.4c",       topic:"Mobilization & Propaganda",        color:"#1A3A5C" },
  { num:"V",   title:"America's Choice", std:"10.4d",       topic:"U.S. Neutrality & Entry",          color:"#1A3A5C" },
  { num:"VI",  title:"The Peace Table",  std:"10.4e",       topic:"Treaty of Versailles & 14 Points", color:"#3A2A5C" },
  { num:"VII", title:"The Verdict",      std:"10.4f",       topic:"Consequences & Seeds of WWII",     color:"#4A1A1A" },
];

const CHAPTERS = [
  {
    num:"I", title:"The Powder Keg", standard:"NYSED Standard 10.4a",
    role:"Senior European Diplomat", years:"1910 – 1914",
    accentColor:"#8B1A1A",
    quote:`"The nations of Europe are like men carrying loads of gunpowder through a crowded city. All it needs is one spark." — European Observer, 1912`,
    ctxHeading:"Europe, 1910 – 1914",
    ctxText:`For decades, the great powers of Europe had been building toward catastrophe — arming at unprecedented rates, competing for colonial territories across Africa and Asia, binding themselves into secret alliances, and fanning the flames of nationalist movements from the Balkans to Ireland.\n\nBy 1914, the continent was a powder keg. Volatile. Pressurized. Waiting.\n\nYou are a senior European diplomat. Your decisions over the next four years will shift the pressures building beneath the surface of civilization. You cannot stop what is coming — but your choices will determine how inevitable it truly was.`,
    decisions:[
      { year:"1910", situation:"Military spending across Europe has reached alarming levels. The nationalist press demands your nation match its rivals. Your treasury warns of dangerous debt. Your generals warn of dangerous weakness.", question:"How do you advise your government on military expansion?",
        choices:[
          { text:"Authorize a major military buildup — the nationalist press demands strength, and weakness invites aggression.", consequence:"Your army grows — and so does fear across the continent. Rival nations accelerate their own buildups. The arms race spirals.", meters:{militarism:16,nationalism:8} },
          { text:"Propose an international disarmament conference — collective reduction is the only path to lasting peace.", consequence:"Two major powers refuse to attend. The press calls you weak. The conference collapses — but the effort briefly stalls the escalation.", meters:{militarism:-5,alliances:7} },
          { text:"Modernize your military quietly, without public announcement or fanfare.", consequence:"A pragmatic choice. Your forces grow more capable without inflaming your neighbors — for now.", meters:{militarism:8,imperialism:4} },
        ]},
      { year:"1911", situation:"The Agadir Crisis: Germany has dispatched a gunboat to Morocco, directly challenging French colonial authority. Your alliance partner is directly involved. The nationalist press demands solidarity. Your diplomats urge caution.", question:"How does your nation respond to the Moroccan Crisis?",
        choices:[
          { text:"Back your alliance partner unconditionally — alliances are meaningless if abandoned in crisis.", consequence:"Your loyalty strengthens the bond between you. But Germany feels encircled, and tensions between the great powers sharpen.", meters:{alliances:12,militarism:8,nationalism:5} },
          { text:"Call for an international conference — no colonial dispute is worth a European war.", consequence:"A settlement is reached at Algeciras. You are a peacemaker abroad — and called a coward at home by nationalist factions.", meters:{alliances:5,nationalism:-6} },
          { text:"Use the crisis to press your own colonial interests while attention is elsewhere.", consequence:"You secure a colonial concession — but at a diplomatic cost. Your neighbors recalculate your trustworthiness.", meters:{imperialism:14,nationalism:7,alliances:-6} },
        ]},
      { year:"1913", situation:"The Balkan Wars have reshaped southeastern Europe. Pan-Slavic nationalism is intensifying across Austria-Hungary's territory. Russia positions itself as protector of Slavic peoples. The empire is straining.", question:"How does your nation respond to the Balkan nationalist crisis?",
        choices:[
          { text:"Support national self-determination — ethnic peoples have the right to govern themselves.", consequence:"Your moral position wins admirers — but destabilizes the region. Underground nationalist networks grow bolder.", meters:{nationalism:16,alliances:-8} },
          { text:"Back Austria-Hungary in suppressing the movements — order must be maintained above all.", consequence:"The empire holds — for now. But brutal suppression radicalizes a new generation of nationalists.", meters:{militarism:10,alliances:8,nationalism:8} },
          { text:"Propose limited cultural autonomy — nationalism without full independence.", consequence:"Neither side is satisfied. The immediate crisis cools. The underlying tensions remain unresolved.", meters:{alliances:5,nationalism:4} },
        ]},
    ],
    hinge:{
      question:"By July 1914, many historians argue war had become nearly inevitable. Which factor within the MAIN framework was MOST responsible for ensuring that a regional conflict could not be contained?",
      choices:["The alliance system — which guaranteed that any local conflict would automatically escalate into a continental war","Militarism — decades of arms races created military establishments eager to deploy the weapons they had built","Imperialism — colonial competition created economic rivalries that could ultimately only be resolved by force","Nationalism — ethnic tensions in the Balkans made a violent spark a near-mathematical certainty"],
      correct:0,
      explanation:"The alliance system is the Regents answer. Without it, the assassination of Franz Ferdinand might have remained an Austro-Serbian dispute. Instead: Austria-Hungary mobilized, Russia followed, Germany declared war on Russia, France was pulled in, and Britain entered when Germany swept through Belgium — in four days. The other MAIN factors created the tensions and loaded the weapon. The alliance system ensured the trigger could not be pulled without killing everyone in the room.",
    },
  },
  {
    num:"II", title:"The Spark", standard:"NYSED Standards 10.4a & 10.4b",
    role:"Senior Austro-Hungarian Official", years:"June – August 1914",
    accentColor:"#7A3B00",
    quote:`"I have just received the news that His Imperial Highness has been shot dead. God have mercy on us all." — Aide to Emperor Franz Josef, June 28, 1914`,
    ctxHeading:"Sarajevo, June 28, 1914",
    ctxText:`At 10:45 in the morning, Archduke Franz Ferdinand — heir to the throne of the Austro-Hungarian Empire — was shot dead in the streets of Sarajevo by Gavrilo Princip, a nineteen-year-old Bosnian Serb nationalist with connections to a secret society known as the Black Hand.\n\nFor Austria-Hungary, this is not merely a murder. It is an opportunity — and a test. The empire can use this moment to crush Serbian nationalism once and for all. Or it can show restraint and risk appearing weak.\n\nBut any military action risks triggering the alliance system that has spent forty years being constructed.\n\nYou are a senior official in the Austro-Hungarian government. The decisions you make in the next thirty-seven days will determine whether this remains a regional crisis — or ignites a world war.`,
    decisions:[
      { year:"June 28 – 30, 1914", situation:"The Archduke is dead. Vienna is in shock and fury. The nationalist press is calling for retaliation against Serbia. Your foreign minister urges investigation before accusation. Your military commanders have war plans already drawn.", question:"What is Austria-Hungary's immediate public posture following the assassination?",
        choices:[
          { text:"Issue a formal statement of outrage, directly implicating Serbia and demanding accountability.", consequence:"The statement shocks European capitals. Serbia's allies begin quiet military preparations. The window for diplomacy begins to close.", meters:{nationalism:14,militarism:10,alliances:-6} },
          { text:"Call for a thorough investigation before making any accusations — evidence must come first.", consequence:"The press criticizes your restraint as weakness. But the delay preserves diplomatic options. Russia and Britain signal appreciation.", meters:{alliances:10,nationalism:-8} },
          { text:"Express outrage through official diplomatic channels — protest without direct accusation.", consequence:"A measured response. You maintain credibility and leverage without immediately escalating the crisis.", meters:{alliances:6,militarism:3} },
        ]},
      { year:"July 5 – 6, 1914", situation:"Kaiser Wilhelm II has delivered the infamous 'blank check' — unconditional German support for whatever action Austria-Hungary takes against Serbia. It is the most powerful diplomatic guarantee you have ever held.", question:"How does Austria-Hungary deploy Germany's unconditional backing?",
        choices:[
          { text:"Draft the harshest possible ultimatum to Serbia — German backing means we need not moderate our demands.", consequence:"The 48-hour ultimatum arrives in Belgrade. Ten of eleven demands are accepted. The one rejected clause becomes your pretext for war.", meters:{militarism:18,nationalism:10,alliances:-12} },
          { text:"Use German backing as leverage to negotiate a settlement — bargain from strength, not aggression.", consequence:"Germany expresses frustration with your restraint. But a genuine diplomatic solution remains possible.", meters:{alliances:14,militarism:-5} },
          { text:"Delay — use the blank check to buy time while reading Russia's true intentions before committing.", consequence:"Delay proves costly. Russia begins quiet mobilization. The window for a clean resolution narrows by the hour.", meters:{alliances:4,militarism:5,nationalism:-4} },
        ]},
      { year:"July 28, 1914", situation:"Serbia has responded — accepting ten of eleven demands, rejecting only the clause requiring Austro-Hungarian investigators on Serbian soil. Your council is divided: some see a path to peace. Others see their long-desired pretext.", question:"Serbia has conceded nearly everything. How does Austria-Hungary respond?",
        choices:[
          { text:"Accept Serbia's partial compliance. Declare a diplomatic victory and stand down.", consequence:"War is avoided. Nationalist hardliners are furious — but the alliance chain does not trigger. Europe breathes.", meters:{alliances:22,militarism:-18,nationalism:-12}, warAvoided:true },
          { text:"Reject Serbia's response as insufficient and declare war.", consequence:"July 28: Austria-Hungary declares war. July 30: Russia mobilizes. August 1: Germany declares war on Russia. August 3: France enters. August 4: Britain enters when Germany invades Belgium. Six days. A world war.", meters:{militarism:22,nationalism:15,alliances:-22}, warDeclared:true },
          { text:"Propose a modified clause through a third-party mediator — one final attempt.", consequence:"Germany loses patience. Austria-Hungary loses credibility with its own hardliners. But the door to peace cracks open — barely.", meters:{alliances:10,militarism:-5,nationalism:-3} },
        ]},
    ],
    hinge:{
      question:"The assassination of Franz Ferdinand is studied as one of the most significant turning points in modern history. Which statement BEST defines what makes an event a historical turning point?",
      choices:["It occurs suddenly and without warning, permanently shocking the world into a new political awareness","It creates irreversible change — a clear before and after that permanently alters the direction of events that follow","It directly and solely causes every single major consequence that appears in the historical record afterward","It involves the death or sudden removal of a powerful political or military leader"],
      correct:1,
      explanation:"A turning point is defined by irreversibility and consequence — a clear before and after. The assassination of Franz Ferdinand did not, by itself, cause WWI. But it triggered a chain of decisions that within 37 days could not be undone. Before June 28: no world war. After: one was nearly inevitable. That fundamental shift in historical direction is exactly what defines a turning point — the analytical framework the Regents exam expects you to apply consistently.",
    },
  },
  {
    num:"III", title:"The Trenches", standard:"NYSED Standards 10.4b & 10.4c",
    role:"British Infantry Soldier", years:"1914 – 1916",
    accentColor:"#2C4A1E",
    quote:`"We are all going to be killed. The war will last forever." — British soldier's letter home, 1915`,
    ctxHeading:"The Western Front, 1914 – 1916",
    ctxText:`By December 1914, the war that everyone predicted would be over by Christmas had settled into something no one had planned for — a 400-mile wall of trenches stretching from the English Channel to Switzerland.\n\nMen lived in narrow ditches of mud and cold water, separated from the enemy by a strip of land called No Man's Land. New weapons — poison gas, machine guns, heavy artillery, barbed wire — had made advancing across open ground nearly suicidal. But generals on both sides kept ordering attacks.\n\nYou are a British infantry soldier on the Western Front. You did not choose this war. You volunteered — or were pressured to volunteer — believing it would be an adventure. What you found instead will define the rest of your life.\n\nThe decisions you face are not the decisions of kings and diplomats. They are the decisions of an ordinary person in an extraordinary catastrophe.`,
    decisions:[
      { year:"August 1914", situation:"War has been declared. Across Britain, recruitment posters cover every wall. Young men are enlisting in massive numbers — your friends, your neighbors, men from your street. Those who don't volunteer face public pressure, white feathers handed to them by women calling them cowards. Your family needs you home. Your country says it needs you more.", question:"How do you respond to the call to enlist?",
        choices:[
          { text:"Volunteer immediately — duty to king and country comes first. The war will be over by Christmas anyway.", consequence:"You enlist alongside thousands of others. The training is brief, the enthusiasm high. By the time you reach France, the war has already stopped moving. You stare at a trench and realize Christmas has come and gone.", meters:{militarism:12,nationalism:10} },
          { text:"Wait and assess — the war may end quickly and your family depends on your income.", consequence:"Public pressure intensifies. A woman hands you a white feather on the street. Your employer suggests men who don't serve aren't welcome back. Three months later you enlist anyway — this time without the enthusiasm.", meters:{nationalism:6,militarism:4} },
          { text:"Seek a role in the war effort at home — factories, logistics, supply chains need workers too.", consequence:"You contribute to the industrial war machine from home. The front still needs what you produce. But the social stigma is real — and some things you will never fully understand from a distance.", meters:{militarism:5,imperialism:6} },
        ]},
      { year:"July 1, 1916 — The Somme", situation:"It is 7:30 AM. Your officer blows his whistle. Around you, thousands of British soldiers climb over the top of the trench and begin walking — walking — across No Man's Land toward the German lines. Artillery was supposed to destroy the German defenses. It didn't. The machine guns are already firing. 57,000 British soldiers will become casualties today — the worst single day in British military history. Your officer has been shot. You are in the open.", question:"What do you do?",
        choices:[
          { text:"Press forward — orders are orders and the objective must be taken regardless of cost.", consequence:"You advance. Most of the men around you fall. You reach a shell crater and take cover. You survive the day — but the objective is not taken. The generals order the attack to continue for four more months.", meters:{militarism:18,nationalism:8} },
          { text:"Take cover in a shell crater and wait — advancing into machine gun fire is suicide.", consequence:"You survive. Others call it cowardice; you call it survival. The battle continues for months. 420,000 British casualties. The front line moves six miles.", meters:{militarism:-5,nationalism:-4} },
          { text:"Help carry wounded soldiers back to the trench — someone has to.", consequence:"You spend the day pulling men from No Man's Land under fire. You save several lives. The generals later debate whether the Somme was worth it. The men who were there never debate it.", meters:{militarism:-3,alliances:5,nationalism:4} },
        ]},
      { year:"1915 – 1916", situation:"The Germans have released chlorine gas along a section of the front — a new weapon that suffocates men in their trenches. Your battalion has primitive gas masks — wet cloth over the nose and mouth. High Command is considering retaliating with gas of their own. Some officers argue it is the only way to break the stalemate. Others say it crosses a line that cannot be uncrossed.", question:"You have the ear of your commanding officer. What do you advise?",
        choices:[
          { text:"Retaliate with gas — the Germans used it first and the stalemate must be broken by any means necessary.", consequence:"Gas becomes a standard weapon on both sides. The suffering multiplies. The stalemate does not break. By the war's end, over one million soldiers have been exposed to chemical weapons.", meters:{militarism:16,nationalism:5} },
          { text:"Refuse to use gas — some methods of warfare cross a moral line regardless of military necessity.", consequence:"Your unit does not deploy gas. Others do. The weapon spreads across the front anyway. But your refusal contributes to post-war pressure that eventually produces the Geneva Protocol banning chemical weapons in 1925.", meters:{militarism:-6,alliances:8} },
          { text:"Push for better protective equipment rather than retaliation — protect our men first.", consequence:"Resources are diverted to improved gas masks. The technology saves thousands of lives. Retaliation comes from other units. The strategic situation is unchanged — but your men survive at higher rates.", meters:{militarism:4,nationalism:6} },
        ]},
    ],
    hinge:{
      question:"World War I is often described as the first 'total war' in history. Which statement BEST explains what made WWI different from earlier European conflicts?",
      choices:[
        "It was the first war in which European nations fought each other rather than colonial peoples",
        "It required the complete mobilization of entire societies — economies, civilians, industry, and technology — not just armies",
        "It resulted in more military casualties than any previous war in world history",
        "It was the first war in which alliances between nations determined who fought on which side",
      ],
      correct:1,
      explanation:"Total war means the entire society is mobilized for the conflict — not just soldiers. In WWI, this meant civilian factories converted to weapons production, women entered the workforce in massive numbers, governments rationed food and controlled economies, and propaganda shaped public opinion at an industrial scale. The new weapons of industrialized warfare — machine guns, poison gas, artillery barrages, tanks, aircraft — required an equally industrialized society behind them. This is the concept the Regents exam uses when it asks about the causes and characteristics of WWI as a turning point in modern warfare.",
    },
  },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');
html,body,#root{width:100%;min-height:100vh;margin:0;padding:0;}
*{box-sizing:border-box;margin:0;padding:0;}
.wof{width:100%;min-height:100vh;background:#0f0d0b;color:#f0e8d8;font-family:'Crimson Pro',Georgia,serif;font-size:20px;line-height:1.7;}
.screen{position:relative;z-index:1;animation:fadeUp .45s ease both;width:100%;}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
@keyframes warFlash{0%,100%{background:transparent;}40%{background:rgba(139,21,21,.35);}}

/* MAIN PANEL */
.main-panel{position:sticky;top:0;z-index:100;background:rgba(8,6,4,.98);backdrop-filter:blur(10px);border-bottom:2px solid rgba(201,165,76,.2);}
.main-panel-inner{display:flex;align-items:stretch;width:100%;}
.main-label-col{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:10px 14px;border-right:2px solid rgba(201,165,76,.18);min-width:60px;background:rgba(201,165,76,.04);}
.main-acronym{font-family:'Cinzel',serif;font-size:20px;font-weight:900;color:#D4AE56;letter-spacing:.1em;line-height:1;}
.main-word{font-family:'Cinzel',serif;font-size:7px;letter-spacing:.2em;color:rgba(212,174,86,.4);text-transform:uppercase;margin-top:3px;}
.main-gauges{display:flex;flex:1;flex-wrap:wrap;}
.mg-item{flex:1;min-width:calc(50% - 1px);display:flex;flex-direction:column;justify-content:center;padding:8px 12px;border-right:1px solid rgba(255,255,255,.05);border-bottom:1px solid rgba(255,255,255,.04);transition:background .3s;}
.mg-item:nth-child(2n){border-right:none;}
.mg-item:nth-child(3),.mg-item:nth-child(4){border-bottom:none;}
.mg-item.high{background:rgba(196,30,30,.06);}
.mg-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:5px;}
.mg-name{font-family:'Cinzel',serif;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;}
.mg-val{font-family:'Cinzel',serif;font-size:20px;font-weight:900;line-height:1;transition:all .6s;}
.mg-track{height:8px;background:rgba(255,255,255,.08);border-radius:4px;overflow:hidden;margin-bottom:4px;}
.mg-fill{height:100%;border-radius:4px;transition:width 1s cubic-bezier(.4,0,.2,1);}
.mg-desc{font-size:10px;color:rgba(240,232,216,.32);letter-spacing:.02em;}

/* On wider screens go back to 4-across */
@media(min-width:600px){
  .mg-item{min-width:0;border-bottom:none;}
  .mg-item:nth-child(2n){border-right:1px solid rgba(255,255,255,.05);}
  .mg-item:last-child{border-right:none;}
  .mg-name{font-size:12px;}
  .mg-val{font-size:24px;}
  .mg-desc{font-size:11px;}
  .main-label-col{padding:12px 18px;min-width:72px;}
  .main-acronym{font-size:22px;}
}

/* LAYOUT */
.content{max-width:880px;width:100%;margin:0 auto;padding:36px 20px 72px;}
@media(min-width:600px){.content{padding:52px 48px 88px;}}
.gold-div{width:100%;height:1px;background:linear-gradient(to right,transparent,rgba(201,165,76,.3),transparent);margin:28px 0;}
.red-bar{width:44px;height:3px;background:#C41E1E;margin-bottom:28px;}

/* BUTTONS */
.btn{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.2em;text-transform:uppercase;background:transparent;border:1px solid rgba(201,165,76,.65);color:#D4AE56;padding:14px 32px;cursor:pointer;transition:all .25s;border-radius:4px;display:inline-block;touch-action:manipulation;}
@media(min-width:600px){.btn{font-size:12px;letter-spacing:.22em;padding:14px 52px;}}
.btn:hover:not(:disabled){background:rgba(201,165,76,.09);border-color:#D4AE56;color:#f0e8d8;box-shadow:0 0 28px rgba(201,165,76,.14);}
.btn:disabled{opacity:.28;cursor:not-allowed;}
.btn-red{border-color:rgba(196,30,30,.6);color:rgba(225,85,85,.95);}
.btn-red:hover:not(:disabled){background:rgba(196,30,30,.09);border-color:#C41E1E;color:#f0e8d8;}
.btn-ghost{border-color:rgba(240,232,216,.18);color:rgba(240,232,216,.4);font-size:11px;padding:10px 22px;}
.btn-ghost:hover:not(:disabled){border-color:rgba(240,232,216,.35);color:rgba(240,232,216,.7);background:transparent;box-shadow:none;}

/* TITLE SCREEN */
.title-screen{min-height:100vh;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:40px 24px;position:relative;overflow:hidden;background:#0a0806;}
.title-screen::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 80%,rgba(139,21,21,.28) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(201,165,76,.08) 0%,transparent 45%);z-index:0;}
.title-content{position:relative;z-index:2;}
.t-year{font-family:'Cinzel',serif;font-size:clamp(72px,18vw,164px);font-weight:900;color:#f0e8d8;letter-spacing:-.02em;line-height:.88;text-shadow:0 0 120px rgba(196,30,30,.5),0 0 60px rgba(196,30,30,.25),0 4px 32px rgba(0,0,0,.98);}
.t-sub{font-family:'Cinzel',serif;font-size:clamp(11px,3vw,20px);letter-spacing:.44em;color:#D4AE56;text-transform:uppercase;margin-top:14px;}
.t-div{width:180px;height:1px;background:linear-gradient(to right,transparent,rgba(201,165,76,.6),transparent);margin:24px auto 36px;}
.wof-input{background:rgba(10,8,6,.8);border:1px solid rgba(240,232,216,.22);color:#f0e8d8;font-family:'Crimson Pro',Georgia,serif;font-size:17px;padding:12px 18px;border-radius:4px;outline:none;transition:border-color .2s;width:100%;max-width:240px;}
.wof-input:focus{border-color:rgba(201,165,76,.7);}
.wof-input::placeholder{color:rgba(240,232,216,.28);}
.t-inputs{display:flex;gap:12px;margin-bottom:28px;flex-wrap:wrap;justify-content:center;}

/* CHAPTER INTRO */
.ch-intro{min-height:100vh;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:40px 24px;position:relative;overflow:hidden;}
.ch-intro-content{position:relative;z-index:2;}
.ch-eyebrow{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.3em;color:#D4AE56;text-transform:uppercase;margin-bottom:14px;}
.ch-number{font-family:'Cinzel',serif;font-size:clamp(52px,14vw,112px);font-weight:900;color:#f0e8d8;line-height:1;margin-bottom:10px;}
.ch-subtitle{font-family:'Cinzel',serif;font-size:clamp(18px,5vw,40px);color:#D4AE56;letter-spacing:.07em;margin-bottom:28px;}
.ch-pill{display:inline-block;border:1px solid rgba(196,30,30,.6);background:rgba(0,0,0,.4);color:rgba(240,232,216,.9);font-family:'Cinzel',serif;font-size:10px;letter-spacing:.18em;text-transform:uppercase;padding:7px 18px;border-radius:3px;margin-bottom:10px;}
.ch-years{font-size:15px;color:rgba(240,232,216,.5);letter-spacing:.12em;margin-bottom:40px;}
.ch-standard{font-size:13px;color:rgba(201,165,76,.55);letter-spacing:.07em;margin-top:20px;}

/* QUOTE BLOCK */
.quote-block{border-left:3px solid rgba(201,165,76,.5);padding:18px 22px;margin-bottom:32px;background:rgba(201,165,76,.04);border-radius:0 4px 4px 0;}
.quote-text{font-size:18px;line-height:1.7;color:rgba(240,232,216,.85);font-style:italic;}

/* CONTEXT */
.ctx-eyebrow{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.26em;color:#D4AE56;text-transform:uppercase;margin-bottom:8px;}
.ctx-line{width:42px;height:2px;background:#C41E1E;margin-bottom:24px;}
.ctx-text{font-size:19px;line-height:1.85;color:#f0e8d8;font-style:italic;white-space:pre-line;}
@media(min-width:600px){.ctx-text{font-size:21px;}}
.ctx-note{margin-top:28px;font-family:'Cinzel',serif;font-size:10px;letter-spacing:.16em;color:rgba(240,232,216,.3);text-transform:uppercase;}

/* HOW TO PLAY */
.htp-screen{min-height:100vh;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:40px 20px;}
.htp-inner{max-width:760px;width:100%;}
.htp-title{font-family:'Cinzel',serif;font-size:clamp(20px,5vw,38px);font-weight:700;color:#f0e8d8;margin-bottom:8px;}
.htp-sub{font-size:17px;color:rgba(240,232,216,.5);margin-bottom:32px;font-style:italic;}
.htp-cards{display:grid;grid-template-columns:1fr;gap:14px;margin-bottom:32px;}
@media(min-width:600px){.htp-cards{grid-template-columns:1fr 1fr;}}
.htp-card{background:rgba(255,255,255,.025);border:1px solid rgba(240,232,216,.09);border-radius:6px;padding:20px;}
.htp-card-num{font-family:'Cinzel',serif;font-size:26px;font-weight:900;color:rgba(212,174,86,.45);margin-bottom:8px;line-height:1;}
.htp-card-title{font-family:'Cinzel',serif;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#D4AE56;margin-bottom:8px;}
.htp-card-text{font-size:16px;line-height:1.65;color:rgba(240,232,216,.82);}
.main-explainer{background:rgba(201,165,76,.04);border:1px solid rgba(201,165,76,.18);border-radius:6px;padding:20px 22px;margin-bottom:32px;}
.main-exp-title{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#D4AE56;margin-bottom:16px;}
.main-exp-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.main-exp-item{display:flex;gap:10px;align-items:flex-start;}
.main-exp-dot{width:10px;height:10px;border-radius:50%;margin-top:5px;flex-shrink:0;}
.main-exp-label{font-size:15px;font-weight:600;}
.main-exp-desc{font-size:14px;color:rgba(240,232,216,.6);}

/* HUB */
.hub-screen{min-height:100vh;width:100%;display:flex;flex-direction:column;}
.hub-header{padding:32px 20px 24px;border-bottom:1px solid rgba(240,232,216,.07);}
@media(min-width:600px){.hub-header{padding:44px 52px 32px;}}
.hub-pretitle{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.26em;color:rgba(212,174,86,.5);text-transform:uppercase;margin-bottom:8px;}
.hub-title{font-family:'Cinzel',serif;font-size:clamp(22px,5vw,42px);font-weight:900;color:#f0e8d8;margin-bottom:6px;}
.hub-player{font-size:15px;color:rgba(240,232,216,.45);font-style:italic;}
.hub-grid{display:grid;grid-template-columns:1fr;gap:14px;padding:24px 20px 40px;}
@media(min-width:520px){.hub-grid{grid-template-columns:repeat(auto-fill,minmax(280px,1fr));padding:32px 52px 48px;}}
.hub-card{border-radius:6px;padding:20px 22px;position:relative;display:flex;flex-direction:column;gap:4px;transition:all .22s;}
.hub-card.available{border:1px solid rgba(201,165,76,.3);background:rgba(201,165,76,.03);cursor:pointer;}
.hub-card.available:hover{border-color:rgba(201,165,76,.65);background:rgba(201,165,76,.07);transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.5);}
.hub-card.completed{border:1px solid rgba(78,154,94,.35);background:rgba(78,154,94,.04);cursor:pointer;}
.hub-card.completed:hover{border-color:rgba(78,154,94,.65);background:rgba(78,154,94,.08);transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.5);}
.hub-card.locked{border:1px solid rgba(240,232,216,.08);background:rgba(255,255,255,.01);cursor:not-allowed;opacity:.4;}
.hub-card.coming{border:1px dashed rgba(240,232,216,.1);cursor:not-allowed;opacity:.28;}
.hub-ch-num{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.2em;color:rgba(240,232,216,.38);text-transform:uppercase;}
.hub-ch-title{font-family:'Cinzel',serif;font-size:18px;font-weight:700;color:#f0e8d8;line-height:1.25;margin-top:2px;}
.hub-ch-std{font-size:13px;color:#D4AE56;margin-top:3px;}
.hub-ch-topic{font-size:13px;color:rgba(240,232,216,.5);margin-top:2px;}
.hub-badge{position:absolute;top:16px;right:16px;font-family:'Cinzel',serif;font-size:9px;letter-spacing:.12em;text-transform:uppercase;padding:4px 10px;border-radius:3px;}
.badge-done{background:rgba(78,154,94,.14);color:rgba(120,200,140,.92);border:1px solid rgba(78,154,94,.32);}
.badge-play{background:rgba(201,165,76,.1);color:rgba(212,174,86,.92);border:1px solid rgba(201,165,76,.32);}
.badge-lock{background:rgba(255,255,255,.04);color:rgba(240,232,216,.28);border:1px solid rgba(255,255,255,.07);}
.badge-coming{background:transparent;color:rgba(240,232,216,.22);border:1px solid rgba(255,255,255,.06);}
.hub-footer{padding:0 20px 36px;}
@media(min-width:600px){.hub-footer{padding:0 52px 40px;}}

/* DECISION */
.dec-progress{display:flex;gap:10px;margin-bottom:32px;}
.pip{width:30px;height:5px;border-radius:3px;background:rgba(255,255,255,.08);transition:background .35s;}
.pip.active{background:#D4AE56;}
.pip.done{background:rgba(201,165,76,.38);}
.dec-year{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.26em;color:#D4AE56;text-transform:uppercase;margin-bottom:14px;}
.dec-situation{font-size:18px;color:#f0e8d8;line-height:1.78;margin-bottom:26px;border-left:3px solid rgba(201,165,76,.4);padding:6px 0 6px 18px;}
@media(min-width:600px){.dec-situation{font-size:20px;}}
.dec-question{font-family:'Cinzel',serif;font-size:17px;color:#f0e8d8;margin-bottom:22px;line-height:1.5;font-weight:600;}
@media(min-width:600px){.dec-question{font-size:19px;}}
.choices{display:flex;flex-direction:column;gap:12px;margin-bottom:30px;}
.choice{border:1px solid rgba(240,232,216,.12);background:rgba(255,255,255,.018);border-radius:6px;padding:16px 18px;cursor:pointer;transition:all .2s;display:flex;gap:14px;align-items:flex-start;touch-action:manipulation;}
.choice:hover{border-color:rgba(201,165,76,.55);background:rgba(201,165,76,.05);}
.choice.sel{border-color:rgba(201,165,76,.8);background:rgba(201,165,76,.08);}
.ch-ltr{font-family:'Cinzel',serif;font-size:13px;font-weight:700;color:#D4AE56;min-width:18px;margin-top:2px;}
.ch-txt{font-size:17px;line-height:1.6;color:#f0e8d8;}
@media(min-width:600px){.ch-txt{font-size:19px;}}

/* CONSEQUENCE */
.con-tag{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.26em;color:rgba(220,80,80,.9);text-transform:uppercase;margin-bottom:12px;}
.con-echo{font-size:16px;color:rgba(240,232,216,.52);font-style:italic;border-left:3px solid rgba(196,30,30,.5);padding:8px 18px;margin-bottom:24px;}
.con-text{font-size:20px;line-height:1.82;color:#f0e8d8;margin-bottom:32px;}
@media(min-width:600px){.con-text{font-size:22px;}}
.meter-changes{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:32px;}
.mc-pill{font-family:'Cinzel',serif;font-size:12px;letter-spacing:.08em;padding:6px 14px;border-radius:3px;border:1px solid;}

/* HINGE */
.hinge-tag{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.26em;color:#D4AE56;text-transform:uppercase;margin-bottom:8px;}
.hinge-q{font-family:'Cinzel',serif;font-size:18px;line-height:1.6;color:#f0e8d8;margin-bottom:26px;font-weight:600;}
@media(min-width:600px){.hinge-q{font-size:20px;}}
.h-choice{border:1px solid rgba(240,232,216,.12);background:rgba(255,255,255,.018);border-radius:6px;padding:16px 18px;cursor:pointer;transition:all .2s;display:flex;gap:14px;align-items:flex-start;margin-bottom:10px;touch-action:manipulation;}
.h-choice:not(.revealed):hover{border-color:rgba(201,165,76,.5);background:rgba(201,165,76,.05);}
.h-choice.h-correct{border-color:rgba(78,154,94,.85);background:rgba(78,154,94,.08);}
.h-choice.h-wrong{border-color:rgba(196,30,30,.35);opacity:.5;}
.h-choice.h-sel-wrong{border-color:rgba(196,30,30,.85);background:rgba(196,30,30,.09);}
.h-ltr{font-family:'Cinzel',serif;font-size:13px;font-weight:700;color:#D4AE56;min-width:18px;margin-top:2px;}
.h-txt{font-size:17px;line-height:1.55;color:#f0e8d8;}
@media(min-width:600px){.h-txt{font-size:19px;}}
.explain-box{background:rgba(201,165,76,.06);border:1px solid rgba(201,165,76,.28);border-radius:6px;padding:22px 24px;margin-top:24px;animation:fadeUp .45s ease both;}
.explain-label{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.22em;color:#D4AE56;text-transform:uppercase;margin-bottom:12px;}
.explain-text{font-size:17px;line-height:1.75;color:#f0e8d8;}
@media(min-width:600px){.explain-text{font-size:19px;}}
.correct-banner{background:rgba(78,154,94,.12);border:1px solid rgba(78,154,94,.4);border-radius:4px;padding:12px 18px;margin-bottom:20px;font-family:'Cinzel',serif;font-size:12px;letter-spacing:.14em;color:rgba(120,210,140,.95);text-transform:uppercase;}
.wrong-banner{background:rgba(196,30,30,.1);border:1px solid rgba(196,30,30,.38);border-radius:4px;padding:12px 18px;margin-bottom:20px;font-family:'Cinzel',serif;font-size:12px;letter-spacing:.14em;color:rgba(230,100,100,.95);text-transform:uppercase;}

/* WAR SCREEN */
.war-screen{min-height:100vh;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:40px 24px;animation:warFlash 1.6s ease forwards;background:radial-gradient(ellipse at center,rgba(80,10,10,.6) 0%,rgba(8,4,4,.98) 70%);}
.war-title{font-family:'Cinzel',serif;font-size:clamp(28px,8vw,70px);font-weight:900;color:#C41E1E;margin-bottom:12px;text-shadow:0 0 80px rgba(196,30,30,.8);letter-spacing:.04em;}
.war-subtitle{font-family:'Cinzel',serif;font-size:14px;letter-spacing:.2em;color:rgba(240,232,216,.5);text-transform:uppercase;margin-bottom:40px;}
.war-cascade{display:flex;flex-direction:column;max-width:600px;width:100%;text-align:left;margin-bottom:40px;}
.war-event{display:flex;gap:16px;align-items:flex-start;padding:12px 0;border-bottom:1px solid rgba(240,232,216,.08);}
.war-date{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.12em;color:#D4AE56;min-width:88px;margin-top:3px;text-transform:uppercase;}
.war-evt-text{font-size:16px;line-height:1.55;color:rgba(240,232,216,.84);}
.war-evt-text.bold{color:#f0e8d8;font-weight:600;}

/* CHAPTER END */
.end-eyebrow{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.26em;color:#D4AE56;text-transform:uppercase;margin-bottom:10px;}
.end-title{font-family:'Cinzel',serif;font-size:clamp(24px,6vw,52px);font-weight:700;color:#f0e8d8;margin-bottom:32px;}
.meters-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px;}
.m-block{background:rgba(255,255,255,.025);border:1px solid rgba(240,232,216,.08);border-radius:6px;padding:16px 18px;}
.m-block-label{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(240,232,216,.55);margin-bottom:6px;}
.m-block-val{font-family:'Cinzel',serif;font-size:32px;font-weight:900;margin-bottom:6px;line-height:1;}
.m-block-track{height:5px;background:rgba(255,255,255,.07);border-radius:3px;}
.m-block-fill{height:100%;border-radius:3px;transition:width 1.1s cubic-bezier(.4,0,.2,1);}
.hinge-result-block{border-radius:6px;padding:16px 20px;margin-bottom:24px;border:1px solid;}
.result-correct{background:rgba(78,154,94,.08);border-color:rgba(78,154,94,.38);}
.result-wrong{background:rgba(196,30,30,.07);border-color:rgba(196,30,30,.28);}
.seeds-warn{background:rgba(196,30,30,.07);border:1px solid rgba(196,30,30,.24);border-radius:6px;padding:14px 18px;margin-bottom:24px;font-size:16px;color:rgba(240,232,216,.82);font-style:italic;}
`;

function MainPanel({ meters }) {
  return (
    <div className="main-panel">
      <div className="main-panel-inner">
        <div className="main-label-col">
          <div className="main-acronym">MAIN</div>
          <div className="main-word">Pressure</div>
          <div className="main-word">Gauges</div>
        </div>
        <div className="main-gauges">
          {M_CFG.map(({ key, label, color, desc }) => {
            const val = meters[key];
            const isHigh = val > 68;
            return (
              <div className={`mg-item${isHigh?" high":""}`} key={key}>
                <div className="mg-top">
                  <span className="mg-name" style={{color}}>{label}</span>
                  <span className="mg-val" style={{color,textShadow:isHigh?`0 0 14px ${color}`:"none"}}>{val}</span>
                </div>
                <div className="mg-track">
                  <div className="mg-fill" style={{width:`${Math.min(val,100)}%`,background:color,boxShadow:isHigh?`0 0 10px ${color}80`:"none"}} />
                </div>
                <div className="mg-desc">{desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TitleScreen({ name, setName, period, setPeriod, onStart, hasSave, savedName }) {
  return (
    <div className="title-screen screen">
      <div className="title-content">
        <div className="t-year">1914</div>
        <div className="t-sub">A &nbsp; W O R L D &nbsp; O N &nbsp; F I R E</div>
        <div className="t-div" />
        {hasSave ? (
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:"rgba(240,232,216,.55)",letterSpacing:".12em",marginBottom:18}}>Welcome back, {savedName}</div>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn" onClick={()=>onStart("hub")}>Continue Your Journey</button>
              <button className="btn btn-ghost" onClick={()=>onStart("new")}>New Student</button>
            </div>
          </div>
        ) : (
          <>
            <div className="t-inputs">
              <input className="wof-input" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} />
              <input className="wof-input" placeholder="Class Period" value={period} onChange={e=>setPeriod(e.target.value)} />
            </div>
            <button className="btn" disabled={!name.trim()||!period.trim()} onClick={()=>onStart("howtoplay")}>Begin the Story</button>
          </>
        )}
        <div style={{marginTop:24,fontSize:13,color:"rgba(240,232,216,.3)",letterSpacing:".07em"}}>Global Studies &amp; Geography 10R · Unit 6</div>
        <div style={{marginTop:8,fontSize:12,color:"rgba(201,165,76,.45)",letterSpacing:".06em"}}>NYSED Standards 10.4a – 10.4f · Seven Chapters</div>
      </div>
    </div>
  );
}

function HowToPlayScreen({ onContinue }) {
  return (
    <div className="htp-screen screen">
      <div className="htp-inner">
        <div className="htp-title">How This Game Works</div>
        <div className="htp-sub">Read this once — it will make every chapter more meaningful.</div>
        <div className="htp-cards">
          {[
            {num:"01",title:"Read the Historical Context",text:"Every chapter opens with a short passage placing you in a time, place, and role. It models exactly how to write Historical Context on the Regents exam."},
            {num:"02",title:"Make Decisions",text:"You face 3 historical decisions per chapter. There is no single right answer — your choices reflect genuine tensions real leaders faced. Every decision has consequences."},
            {num:"03",title:"Watch the MAIN Panel",text:"The four gauges track Militarism, Alliances, Imperialism, and Nationalism. Your decisions shift these forces. When a gauge glows red, Europe is in danger."},
            {num:"04",title:"Answer the Turning Point Question",text:"Each chapter ends with a Regents-style question. Read the full explanation whether right or wrong — it contains the analytical thinking the exam expects."},
          ].map(c=>(
            <div className="htp-card" key={c.num}>
              <div className="htp-card-num">{c.num}</div>
              <div className="htp-card-title">{c.title}</div>
              <div className="htp-card-text">{c.text}</div>
            </div>
          ))}
        </div>
        <div className="main-explainer">
          <div className="main-exp-title">Understanding the MAIN Pressure Gauges</div>
          <div className="main-exp-grid">
            {M_CFG.map(m=>(
              <div className="main-exp-item" key={m.key}>
                <div className="main-exp-dot" style={{background:m.color}} />
                <div>
                  <div className="main-exp-label" style={{color:m.color}}>{m.label}</div>
                  <div className="main-exp-desc">{m.desc}. Higher = greater instability.</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn" onClick={onContinue}>I'm Ready — Begin Chapter I</button>
      </div>
    </div>
  );
}

function ChapterHub({ name, period, completedChapters, onSelectChapter, onResetSave }) {
  const getStatus = (idx) => {
    if (idx >= CHAPTERS.length) return "coming";
    if (completedChapters.includes(idx)) return "completed";
    if (idx === 0 || completedChapters.includes(idx-1)) return "available";
    return "locked";
  };
  return (
    <div className="hub-screen screen">
      <div className="hub-header">
        <div className="hub-pretitle">1914 · A World on Fire</div>
        <div className="hub-title">Chapter Select</div>
        <div className="hub-player">{name} · Period {period} · {completedChapters.length}/{CHAPTERS.length} complete</div>
      </div>
      <div className="hub-grid">
        {ALL_CHAPTER_META.map((ch,idx)=>{
          const status = getStatus(idx);
          const playable = status==="available"||status==="completed";
          return (
            <div key={ch.num} className={`hub-card ${status}`}
              onClick={()=>playable&&onSelectChapter(idx)}
              style={{borderLeft:playable?`3px solid ${ch.color}`:undefined}}>
              <div className="hub-ch-num">Chapter {ch.num}</div>
              <div className="hub-ch-title">{ch.title}</div>
              <div className="hub-ch-std">Standard {ch.std}</div>
              <div className="hub-ch-topic">{ch.topic}</div>
              <div className={`hub-badge ${status==="completed"?"badge-done":status==="available"?"badge-play":status==="locked"?"badge-lock":"badge-coming"}`}>
                {status==="completed"?"✓ Complete":status==="available"?"▶ Play":status==="locked"?"🔒 Locked":"Coming Soon"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="hub-footer">
        <button className="btn btn-ghost" onClick={onResetSave}>Reset All Progress</button>
      </div>
    </div>
  );
}

function ChapterIntroScreen({ chapter, onContinue }) {
  const bg = `radial-gradient(ellipse at 30% 70%,${chapter.accentColor}44 0%,transparent 55%),radial-gradient(ellipse at 75% 25%,${chapter.accentColor}22 0%,transparent 50%),#0a0806`;
  return (
    <div className="ch-intro screen" style={{background:bg}}>
      <div className="ch-intro-content">
        <div className="ch-eyebrow">Chapter</div>
        <div className="ch-number" style={{textShadow:`0 0 80px ${chapter.accentColor}88`}}>{chapter.num}</div>
        <div className="ch-subtitle">{chapter.title}</div>
        <div className="ch-pill">Your Role: {chapter.role}</div>
        <div className="ch-years">{chapter.years}</div>
        <button className="btn" onClick={onContinue}>Read Historical Context</button>
        <div className="ch-standard">{chapter.standard}</div>
      </div>
    </div>
  );
}

function ContextScreen({ chapter, onContinue }) {
  return (
    <div className="screen">
      <div className="content">
        {chapter.quote&&<div className="quote-block"><div className="quote-text">{chapter.quote}</div></div>}
        <div className="ctx-eyebrow">{chapter.ctxHeading}</div>
        <div className="ctx-line" />
        <div className="ctx-text">{chapter.ctxText}</div>
        <div className="gold-div" />
        <div className="ctx-note">This passage models Regents Historical Context writing — notice how it situates events in a broader pattern before focusing on the specific moment</div>
        <div style={{marginTop:28}}><button className="btn" onClick={onContinue}>Enter the Decision</button></div>
      </div>
    </div>
  );
}

function DecisionScreen({ chapter, decision, decisionIdx, selectedChoice, onSelect, onConfirm }) {
  return (
    <div className="screen">
      <div className="content">
        <div className="dec-progress">
          {chapter.decisions.map((_,i)=><div key={i} className={`pip ${i<decisionIdx?"done":i===decisionIdx?"active":""}`} />)}
        </div>
        <div className="dec-year">{decision.year}</div>
        <div className="dec-situation">{decision.situation}</div>
        <div className="gold-div" style={{margin:"18px 0"}} />
        <div className="dec-question">{decision.question}</div>
        <div className="choices">
          {decision.choices.map((c,i)=>(
            <div key={i} className={`choice ${selectedChoice===i?"sel":""}`} onClick={()=>onSelect(i)}>
              <span className="ch-ltr">{["A","B","C"][i]}</span>
              <span className="ch-txt">{c.text}</span>
            </div>
          ))}
        </div>
        <button className="btn" disabled={selectedChoice===null} onClick={onConfirm}>Commit to This Decision</button>
      </div>
    </div>
  );
}

function ConsequenceScreen({ decision, choiceIdx, onContinue }) {
  const choice = decision.choices[choiceIdx];
  return (
    <div className="screen">
      <div className="content">
        <div className="con-tag">— Consequence —</div>
        <div className="con-echo">You chose: "{choice.text}"</div>
        <div className="con-text">{choice.consequence}</div>
        <div className="meter-changes">
          {Object.entries(choice.meters).map(([k,v])=>{
            const cfg=M_CFG.find(m=>m.key===k);
            const pos=v>0;
            return <span key={k} className="mc-pill" style={{borderColor:pos?`${cfg.color}60`:"rgba(240,232,216,.15)",color:pos?cfg.color:"rgba(240,232,216,.5)",background:pos?`${cfg.color}10`:"transparent"}}>{cfg.label} {pos?"+":""}{v}</span>;
          })}
        </div>
        <button className="btn" onClick={onContinue}>{choice.warDeclared?"Watch the World Burn":choice.warAvoided?"See the World React":"Continue"}</button>
      </div>
    </div>
  );
}

function WarDeclaredScreen({ avoided, onContinue }) {
  if (avoided) return (
    <div className="war-screen screen" style={{background:"radial-gradient(ellipse at center,rgba(20,60,20,.5) 0%,rgba(4,10,4,.98) 70%)"}}>
      <div className="war-title" style={{color:"#4E9A5E",textShadow:"0 0 70px rgba(78,154,94,.6)"}}>War Averted</div>
      <div className="war-subtitle">History takes a different path</div>
      <div className="war-cascade">
        {["Serbia accepts modified terms — sovereignty preserved","Austria-Hungary declares a diplomatic victory","European capitals exhale — the crisis is contained","The alliance system does not trigger","History — this time — turns away from catastrophe"].map((t,i)=>(
          <div key={i} className="war-event"><span className="war-date" style={{color:"#4E9A5E"}}>Result {i+1}</span><span className="war-evt-text">{t}</span></div>
        ))}
      </div>
      <button className="btn" style={{borderColor:"rgba(78,154,94,.55)",color:"rgba(78,154,94,.9)"}} onClick={onContinue}>Continue to Turning Point Question</button>
    </div>
  );
  return (
    <div className="war-screen screen">
      <div className="war-title">The World Goes to War</div>
      <div className="war-subtitle">The chain reaction — six days</div>
      <div className="war-cascade">
        {[{date:"July 28",text:"Austria-Hungary declares war on Serbia",bold:true},{date:"July 30",text:"Russia begins full mobilization — 1.4 million soldiers"},{date:"August 1",text:"Germany declares war on Russia",bold:true},{date:"August 3",text:"Germany declares war on France — Schlieffen Plan activated"},{date:"August 4",text:"Germany invades neutral Belgium. Britain declares war on Germany.",bold:true},{date:"August 12",text:"France and Britain declare war on Austria-Hungary"}].map((e,i)=>(
          <div key={i} className="war-event"><span className="war-date">{e.date}</span><span className={`war-evt-text${e.bold?" bold":""}`}>{e.text}</span></div>
        ))}
      </div>
      <div style={{fontSize:15,color:"rgba(240,232,216,.38)",fontStyle:"italic",marginBottom:36,maxWidth:480,textAlign:"center"}}>
        "The lamps are going out all over Europe. We shall not see them lit again in our lifetime." — Sir Edward Grey, August 3, 1914
      </div>
      <button className="btn btn-red" onClick={onContinue}>Continue to Turning Point Question</button>
    </div>
  );
}

function HingeScreen({ chapter, selected, revealed, onSelect, onContinue }) {
  const correct=chapter.hinge.correct;
  const isRight=selected===correct;
  const getClass=(i)=>{ if(!revealed) return ""; if(i===correct) return "h-correct"; if(i===selected) return "h-sel-wrong"; return "h-wrong"; };
  return (
    <div className="screen">
      <div className="content">
        <div className="hinge-tag">— Regents Turning Point Question —</div>
        <div style={{height:6}} />
        <div className="red-bar" />
        <div className="hinge-q">{chapter.hinge.question}</div>
        {revealed&&<div className={isRight?"correct-banner":"wrong-banner"}>{isRight?"✓ Correct — ":"✗ Incorrect — "}{chapter.hinge.choices[correct].slice(0,65)}...</div>}
        {chapter.hinge.choices.map((c,i)=>(
          <div key={i} className={`h-choice${revealed?" revealed":""} ${getClass(i)}`} onClick={()=>!revealed&&onSelect(i)}>
            <span className="h-ltr">{["A","B","C","D"][i]}</span>
            <span className="h-txt">{c}</span>
          </div>
        ))}
        {revealed&&<div className="explain-box"><div className="explain-label">Regents Analysis — Read This Carefully</div><div className="explain-text">{chapter.hinge.explanation}</div></div>}
        {revealed&&<div style={{marginTop:32}}><button className="btn" onClick={onContinue}>Complete Chapter {chapter.num}</button></div>}
      </div>
    </div>
  );
}

function ChapterEndScreen({ chapter, meters, hingeCorrect, seeds, onReturnToHub }) {
  return (
    <div className="screen">
      <div className="content">
        <div className="end-eyebrow">Chapter {chapter.num} Complete</div>
        <div className="end-title">{chapter.title}</div>
        <div className="meters-2col">
          {M_CFG.map(({key,label,color})=>(
            <div className="m-block" key={key}>
              <div className="m-block-label">{label}</div>
              <div className="m-block-val" style={{color}}>{meters[key]}</div>
              <div className="m-block-track"><div className="m-block-fill" style={{width:`${meters[key]}%`,background:color}} /></div>
            </div>
          ))}
        </div>
        <div className={`hinge-result-block ${hingeCorrect?"result-correct":"result-wrong"}`}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:".2em",textTransform:"uppercase",color:hingeCorrect?"rgba(78,154,94,.75)":"rgba(196,30,30,.7)",marginBottom:8}}>Turning Point Question</div>
          <div style={{fontSize:17,color:"#f0e8d8"}}>{hingeCorrect?"✓ Correct — strong Regents reasoning.":"✗ Review the analysis above — this concept will appear on the exam."}</div>
        </div>
        {seeds>3&&<div className="seeds-warn">⚠ Your decisions have strengthened conditions historians link to future European instability. A hidden tracker is accumulating — it will be revealed in Chapter VII.</div>}
        <button className="btn" onClick={onReturnToHub}>Return to Chapter Select</button>
      </div>
    </div>
  );
}

export default function App() {
  const saved = loadSave();
  const [screen,setScreen]=useState("title");
  const [name,setName]=useState(saved?.name||"");
  const [period,setPeriod]=useState(saved?.period||"");
  const [completedChapters,setCompletedChapters]=useState(saved?.completed||[]);
  const [chIdx,setChIdx]=useState(0);
  const [decIdx,setDecIdx]=useState(0);
  const [meters,setMeters]=useState({...INIT_METERS});
  const [seeds,setSeeds]=useState(saved?.seeds||0);
  const [selChoice,setSelChoice]=useState(null);
  const [hingeSelected,setHingeSelected]=useState(null);
  const [hingeRevealed,setHingeRevealed]=useState(false);
  const [hingeCorrect,setHingeCorrect]=useState(false);
  const [warType,setWarType]=useState(null);
  const [animKey,setAnimKey]=useState(0);

  const chapter=CHAPTERS[chIdx]||CHAPTERS[0];
  const decision=chapter.decisions[decIdx]||chapter.decisions[0];
  const go=(s)=>{setAnimKey(k=>k+1);setScreen(s);window.scrollTo(0,0);};
  const saveProgress=(c,s)=>writeSave({name,period,completed:c,seeds:s});

  const applyMeters=(delta)=>{
    setMeters(prev=>{
      const next={...prev};
      for(const [k,v] of Object.entries(delta)) if(k in next) next[k]=Math.max(0,Math.min(100,next[k]+v));
      return next;
    });
    if((delta.militarism||0)>0) setSeeds(s=>s+Math.floor((delta.militarism||0)/6));
    if((delta.alliances||0)<-8) setSeeds(s=>s+1);
  };

  const handleTitleStart=(mode)=>{
    if(mode==="hub"){go("hub");return;}
    if(mode==="new"){clearSave();setName("");setPeriod("");setCompletedChapters([]);setSeeds(0);setAnimKey(k=>k+1);setScreen("title");return;}
    go("howtoplay");
  };

  const handleSelectChapter=(idx)=>{
    setChIdx(idx);setDecIdx(0);setSelChoice(null);setWarType(null);
    setHingeSelected(null);setHingeRevealed(false);setMeters({...INIT_METERS});
    go("chapterIntro");
  };

  const handleConfirm=()=>{
    const c=decision.choices[selChoice];
    applyMeters(c.meters);
    if(c.warDeclared) setWarType("declared");
    else if(c.warAvoided) setWarType("avoided");
    go("consequence");
  };

  const handleConsequenceContinue=()=>{
    const c=decision.choices[selChoice];
    if(c.warDeclared||c.warAvoided){go("warScreen");return;}
    if(decIdx<chapter.decisions.length-1){setDecIdx(d=>d+1);setSelChoice(null);go("decision");}
    else{setHingeSelected(null);setHingeRevealed(false);go("hinge");}
  };

  const handleHingeSelect=(i)=>{
    if(!hingeRevealed){setHingeSelected(i);setHingeRevealed(true);setHingeCorrect(i===chapter.hinge.correct);}
  };

  const handleChapterComplete=()=>{
    const newCompleted=completedChapters.includes(chIdx)?completedChapters:[...completedChapters,chIdx];
    setCompletedChapters(newCompleted);
    saveProgress(newCompleted,seeds);
    go("chapterEnd");
  };

  const handleResetSave=()=>{
    if(window.confirm("Reset all progress? This cannot be undone.")){
      clearSave();setCompletedChapters([]);setSeeds(0);setName("");setPeriod("");go("title");
    }
  };

  const showPanel=!["title","howtoplay","hub","chapterIntro"].includes(screen);

  return (
    <>
      <style>{CSS}</style>
      <div className="wof">
        {showPanel&&<MainPanel meters={meters}/>}
        <div key={animKey}>
          {screen==="title"         &&<TitleScreen name={name} setName={setName} period={period} setPeriod={setPeriod} onStart={handleTitleStart} hasSave={!!saved} savedName={saved?.name}/>}
          {screen==="howtoplay"     &&<HowToPlayScreen onContinue={()=>{writeSave({name,period,completed:[],seeds:0});go("hub");}}/>}
          {screen==="hub"           &&<ChapterHub name={name} period={period} completedChapters={completedChapters} onSelectChapter={handleSelectChapter} onResetSave={handleResetSave}/>}
          {screen==="chapterIntro"  &&<ChapterIntroScreen chapter={chapter} onContinue={()=>go("chapterContext")}/>}
          {screen==="chapterContext"&&<ContextScreen chapter={chapter} onContinue={()=>{setDecIdx(0);setSelChoice(null);go("decision");}}/>}
          {screen==="decision"      &&<DecisionScreen chapter={chapter} decision={decision} decisionIdx={decIdx} selectedChoice={selChoice} onSelect={setSelChoice} onConfirm={handleConfirm}/>}
          {screen==="consequence"   &&<ConsequenceScreen decision={decision} choiceIdx={selChoice} onContinue={handleConsequenceContinue}/>}
          {screen==="warScreen"     &&<WarDeclaredScreen avoided={warType==="avoided"} onContinue={()=>{setHingeSelected(null);setHingeRevealed(false);go("hinge");}}/>}
          {screen==="hinge"         &&<HingeScreen chapter={chapter} selected={hingeSelected} revealed={hingeRevealed} onSelect={handleHingeSelect} onContinue={handleChapterComplete}/>}
          {screen==="chapterEnd"    &&<ChapterEndScreen chapter={chapter} meters={meters} hingeCorrect={hingeCorrect} seeds={seeds} onReturnToHub={()=>go("hub")}/>}
        </div>
      </div>
    </>
  );
}
