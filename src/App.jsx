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
  { num:"I",   title:"The Powder Keg",   std:"10.4a",       topic:"Causes of WWI & MAIN Framework",   color:"#8B1A1A" },
  { num:"II",  title:"The Spark",        std:"10.4a-10.4b", topic:"Assassination & Alliance Chain",    color:"#7A3B00" },
  { num:"III", title:"The Trenches",     std:"10.4b-10.4c", topic:"Total War & New Weapons",           color:"#2C4A1E" },
  { num:"IV",  title:"The Home Front",   std:"10.4c",       topic:"Mobilization & Propaganda",         color:"#1A3A5C" },
  { num:"V",   title:"America's Choice", std:"10.4d",       topic:"U.S. Neutrality & Entry",           color:"#243B55" },
  { num:"VI",  title:"The Peace Table",  std:"10.4e",       topic:"Treaty of Versailles & 14 Points",  color:"#3A2A5C" },
  { num:"VII", title:"The Verdict",      std:"10.4f",       topic:"Consequences & Seeds of WWII",      color:"#4A1A1A" },
];

const CHAPTERS = [
  {
    num:"I", title:"The Powder Keg", standard:"NYSED Standard 10.4a",
    role:"Senior European Diplomat", years:"1910 - 1914", accentColor:"#8B1A1A",
    quote:`"The nations of Europe are like men carrying loads of gunpowder through a crowded city. All it needs is one spark." - European Observer, 1912`,
    ctxHeading:"Europe, 1910 - 1914",
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
          { text:"Call for an international conference — no colonial dispute is worth a European war.", consequence:"A settlement is reached. You are a peacemaker abroad — and called a coward at home by nationalist factions.", meters:{alliances:5,nationalism:-6} },
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
      explanation:"The alliance system is the Regents answer — and the most historically defensible one. Without it, the assassination of Franz Ferdinand might have remained an Austro-Serbian dispute. Instead: Austria-Hungary mobilized, Russia followed, Germany declared war on Russia, France was pulled in, and Britain entered when Germany swept through Belgium — in four days. The other MAIN factors created the tensions and loaded the weapon. The alliance system ensured the trigger could not be pulled without killing everyone in the room.",
    },
  },
  {
    num:"II", title:"The Spark", standard:"NYSED Standards 10.4a & 10.4b",
    role:"Senior Austro-Hungarian Official", years:"June - August 1914", accentColor:"#7A3B00",
    quote:`"I have just received the news that His Imperial Highness has been shot dead. God have mercy on us all." - Aide to Emperor Franz Josef, June 28, 1914`,
    ctxHeading:"Sarajevo, June 28, 1914",
    ctxText:`At 10:45 in the morning, Archduke Franz Ferdinand — heir to the throne of the Austro-Hungarian Empire — was shot dead in the streets of Sarajevo by Gavrilo Princip, a nineteen-year-old Bosnian Serb nationalist with connections to a secret society known as the Black Hand.\n\nFor Austria-Hungary, this is not merely a murder. It is an opportunity — and a test. The empire can use this moment to crush Serbian nationalism once and for all. Or it can show restraint and risk appearing weak.\n\nBut any military action risks triggering the alliance system that has spent forty years being constructed.\n\nYou are a senior official in the Austro-Hungarian government. The decisions you make in the next thirty-seven days will determine whether this remains a regional crisis — or ignites a world war.`,
    decisions:[
      { year:"June 28-30, 1914", situation:"The Archduke is dead. Vienna is in shock and fury. The nationalist press is already calling for retaliation against Serbia. Your foreign minister urges investigation before accusation. Your military commanders have war plans already drawn.", question:"What is Austria-Hungary's immediate public posture following the assassination?",
        choices:[
          { text:"Issue a formal statement of outrage, directly implicating Serbia and demanding accountability.", consequence:"The statement shocks European capitals. Serbia's allies begin quiet military preparations. The window for diplomacy begins to close.", meters:{nationalism:14,militarism:10,alliances:-6} },
          { text:"Call for a thorough investigation before making any accusations — evidence must come first.", consequence:"The press criticizes your restraint as weakness. But the delay preserves diplomatic options. Russia and Britain signal appreciation.", meters:{alliances:10,nationalism:-8} },
          { text:"Express outrage through official diplomatic channels — protest without direct accusation.", consequence:"A measured response. You maintain credibility and leverage without immediately escalating the crisis.", meters:{alliances:6,militarism:3} },
        ]},
      { year:"July 5-6, 1914", situation:"Kaiser Wilhelm II has delivered the infamous 'blank check' — unconditional German support for whatever action Austria-Hungary takes against Serbia. It is the most powerful diplomatic guarantee you have ever held.", question:"How does Austria-Hungary deploy Germany's unconditional backing?",
        choices:[
          { text:"Draft the harshest possible ultimatum to Serbia — German backing means we need not moderate our demands.", consequence:"The 48-hour ultimatum arrives in Belgrade. Ten of eleven demands are accepted. The one rejected clause becomes your pretext for war.", meters:{militarism:18,nationalism:10,alliances:-12} },
          { text:"Use German backing as leverage to negotiate a settlement — bargain from strength, not aggression.", consequence:"Germany expresses frustration with your restraint. But a genuine diplomatic solution remains possible.", meters:{alliances:14,militarism:-5} },
          { text:"Delay — use the blank check to buy time while reading Russia's true intentions before committing.", consequence:"Delay proves costly. Russia begins quiet mobilization. The window for a clean resolution narrows by the hour.", meters:{alliances:4,militarism:5,nationalism:-4} },
        ]},
      { year:"July 28, 1914", situation:"Serbia has responded to your ultimatum — accepting ten of eleven demands, rejecting only the clause requiring Austro-Hungarian investigators on Serbian soil. Your council is divided: some see a path to peace. Others see their long-desired pretext.", question:"Serbia has conceded nearly everything. How does Austria-Hungary respond?",
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
      explanation:"A turning point is defined by irreversibility and consequence — a clear before and after. The assassination of Franz Ferdinand did not, by itself, cause WWI. But it triggered a chain of decisions that, within 37 days, could not be undone. Before June 28: no world war. After: one was nearly inevitable. That fundamental shift in historical direction is exactly what defines a turning point. This is the analytical framework the Regents exam expects you to apply consistently.",
    },
  },
  {
    num:"III", title:"The Trenches", standard:"NYSED Standards 10.4b & 10.4c",
    role:"British Infantry Officer", years:"1914 - 1917", accentColor:"#2C4A1E",
    quote:`"We are all going to die somewhere in this mud. The only question is whether we die for something." - British soldier's diary, Somme, 1916`,
    ctxHeading:"The Western Front, 1914 - 1917",
    ctxText:`In the autumn of 1914, military commanders on both sides expected the war to be over by Christmas. They were wrong.\n\nWithin weeks, the Western Front had settled into something no general had planned for and no soldier had experienced: the trench. Four hundred miles of ditches stretching from the Belgian coast to the Swiss border. Mud. Rats. Poison gas. Artillery barrages that turned forests into matchsticks and men into memory.\n\nFor three years, the front line moved by yards. Measured in corpses. The Battle of the Somme — July 1, 1916 — produced 57,470 British casualties in a single day. The first day.\n\nYou are a British Infantry Officer on the Western Front. Your decisions will not change the war. But they will reveal what total war actually demands from the human beings caught inside it.`,
    decisions:[
      { year:"August 1914", situation:"War has been declared. Across Britain, young men flood recruitment offices — stirred by patriotism, social pressure, and newspapers calling it 'the great adventure.' Your regiment needs officers. Your friends are enlisting. The recruiting sergeant is looking at you.", question:"How do you respond to the call to enlist?",
        choices:[
          { text:"Enlist immediately and enthusiastically — your country needs you and hesitation feels like cowardice.", consequence:"You join a wave of volunteers that will become the British Expeditionary Force. The enthusiasm is genuine. What waits in France is not what the newspapers described.", meters:{militarism:10,nationalism:14} },
          { text:"Enlist, but with private reservations — you have doubts, but the social pressure is overwhelming.", consequence:"You are not alone in your ambivalence. Many soldiers go to war this way — not with glory in their hearts, but with the inability to say no to everything around them.", meters:{nationalism:8,militarism:5} },
          { text:"Resist enlistment on grounds of conscience — this war is not what the newspapers claim it is.", consequence:"You face social ostracism and accusations of cowardice. In 1914, this takes genuine courage. Conscientious objectors will be imprisoned, shamed, and handed white feathers by strangers on the street.", meters:{nationalism:-6,alliances:5} },
        ]},
      { year:"April 1915 - Second Battle of Ypres", situation:"The Germans have just deployed chlorine gas for the first time in history. A yellow-green cloud drifts toward your position. Soldiers are choking, blinded, dying. Your men look to you. You have no gas masks — only wet cloths, if you're lucky.", question:"How do you lead your men through the first chemical weapons attack in history?",
        choices:[
          { text:"Order an immediate retreat — no position is worth dying from a weapon you cannot see or fight.", consequence:"You save most of your men. You lose the position. Command will question your judgment. History will eventually question the weapon, not you.", meters:{militarism:8,nationalism:-5} },
          { text:"Hold the position — urge men to urinate on cloths and press them to their faces. Hold the line.", consequence:"Improvised filters help somewhat. You hold the position. The casualties are significant. Your men will never forget what they witnessed in that yellow-green cloud.", meters:{militarism:14,nationalism:10,alliances:5} },
          { text:"Send an urgent message up the chain of command demanding permission to withdraw, and wait.", consequence:"The message takes forty minutes to return. In that forty minutes, eleven of your men are dead. Military bureaucracy and poison gas make a lethal combination.", meters:{militarism:5,alliances:-6} },
        ]},
      { year:"July 1, 1916 - The Battle of the Somme", situation:"You have received orders: at 7:30 AM, your battalion goes over the top. Your men are to walk — walk — across No Man's Land toward the German wire. Command believes the week-long artillery barrage has destroyed the German defenses. You have studied the German positions. You are not so certain.", question:"How do you lead your men into the Battle of the Somme?",
        choices:[
          { text:"Follow orders precisely — lead your men over the top at 7:30, walking in formation as commanded.", consequence:"You follow orders. The German machine guns, largely intact in their deep dugouts, open up within seconds. Of your 120 men, 64 become casualties in the first hour. You survive. Most of them do not.", meters:{militarism:18,nationalism:8,alliances:-5} },
          { text:"Adapt the orders — send small groups in quick rushes rather than walking in line, despite regulations.", consequence:"You violate protocol. Your casualties are significantly lower than neighboring battalions. Your commanding officer reprimands you. Your men are alive to receive the reprimand.", meters:{militarism:8,alliances:6,nationalism:5} },
          { text:"Formally protest the orders before the attack — demand new reconnaissance before committing your men.", consequence:"Your protest is noted and dismissed. You are ordered to proceed. But your men witness an officer who tried to protect them — and that matters, even when it changes nothing.", meters:{alliances:10,militarism:5,nationalism:3} },
        ]},
    ],
    hinge:{
      question:"By late 1914, the Western Front had become a military stalemate that neither side could break for nearly four years. Which factor BEST explains why this stalemate developed?",
      choices:["Military technology — especially machine guns and artillery — made offensive advances catastrophically costly while defenders held fortified positions","Poor military leadership on both sides — better generals would have found a way to break through the enemy lines","The alliance system — it created too many nations fighting on too many fronts for either side to concentrate enough force","Nationalism — soldiers on both sides were too committed to their cause to negotiate a settlement that could end the fighting"],
      correct:0,
      explanation:"The stalemate of WWI was primarily technological. The machine gun could fire 400-600 rounds per minute, making infantry charges across open ground suicidal. Artillery could pound positions for days — but the explosions that destroyed offensive troops also churned the ground into mud that slowed any advance to a crawl. Defenders could dig in and survive bombardment; attackers could not move fast enough to exploit any gap before reserves arrived. This is why the Somme cost 57,470 British casualties on its first day — and why the front line moved less than seven miles in four years. The Regents exam expects you to connect specific technological changes to their military and historical consequences.",
    },
  },
  {
    num:"IV", title:"The Home Front", standard:"NYSED Standard 10.4c",
    role:"U.S. Government Mobilization Official", years:"1917 - 1918", accentColor:"#1A3A5C",
    quote:`"It is not an army that we must shape and train for war; it is a nation." - Woodrow Wilson, 1917`,
    ctxHeading:"The American Home Front, 1917 - 1918",
    ctxText:`When the United States entered the war in April 1917, it faced a problem unlike any in its history: how do you transform a nation of 103 million people — many of them recent immigrants with ties to both sides of the conflict — into a unified war machine in less than two years?\n\nThe answer was total mobilization. The federal government took control of railroads, coal mines, and telegraph lines. Women entered factories in unprecedented numbers. Food was rationed. Dissent was criminalized under the Espionage Act (1917) and Sedition Act (1918). Propaganda posters told Americans what to eat, what to think, and who to fear.\n\nFor the first time in American history, the war was not just something soldiers fought. It was something every citizen was conscripted into — economically, psychologically, and legally.\n\nYou are a U.S. Government Mobilization Official. Your decisions will shape how America wages total war on the home front.`,
    decisions:[
      { year:"April 1917", situation:"America has just entered the war. Public opinion is divided — many Americans, particularly German-Americans and recent immigrants, oppose intervention. The Committee on Public Information has been created to build war support. You must decide how to deploy it.", question:"How do you mobilize American public opinion for the war effort?",
        choices:[
          { text:"Launch an honest information campaign — explain the real reasons for intervention and trust citizens to support the cause.", consequence:"Your campaign is factual and measured. Support builds slowly but sustainably. Immigrant communities are not alienated. The press respects the transparency.", meters:{alliances:10,nationalism:6} },
          { text:"Deploy fear-based propaganda — use posters, films, and speeches to demonize Germany and silence dissent.", consequence:"Public fervor reaches a fever pitch. German-Americans face harassment. Schools ban German language. Sauerkraut is renamed 'liberty cabbage.' Unity comes at a cost measured in civil liberties.", meters:{nationalism:18,militarism:8,alliances:-5} },
          { text:"Focus propaganda on democratic ideals — frame the war as a fight for freedom, not against Germany.", consequence:"The idealistic framing energizes progressives and immigrants alike. It also raises expectations about the peace that will prove very difficult to meet in Paris.", meters:{nationalism:12,alliances:8} },
        ]},
      { year:"1917 - Labor Crisis", situation:"With millions of men deployed overseas, American factories face a severe labor shortage. Women are already filling some roles. African Americans are migrating north from the South in the Great Migration, seeking war industry jobs. Factory owners resist both groups.", question:"How do you address the wartime labor shortage?",
        choices:[
          { text:"Actively recruit women and African American workers into all war industries, regardless of factory owner resistance.", consequence:"Production expands significantly. Women prove essential to the war effort. African American workers gain wages previously unavailable — but face violent resistance from white workers in northern cities.", meters:{nationalism:8,imperialism:-4,alliances:5} },
          { text:"Expand women's roles but leave racial barriers in place — avoid the political controversy of racial integration.", consequence:"Production improves, but not enough. African American workers excluded from war industry will remember this calculation. The Great Migration accelerates regardless.", meters:{nationalism:5,militarism:5} },
          { text:"Incentivize existing white male workers through higher wages and defer their conscription for essential industries.", consequence:"Skilled workers stay productive, but the labor shortage deepens. Production targets are missed. The cost of this choice will be measured in delayed shipments to the front.", meters:{militarism:8,nationalism:3} },
        ]},
      { year:"1918 - Civil Liberties", situation:"The Espionage Act (1917) and Sedition Act (1918) make it a federal crime to criticize the war, the draft, or the government. Socialist Eugene Debs has been arrested for an anti-war speech. The Supreme Court will soon rule on the limits of wartime free speech.", question:"How far should the government go in suppressing anti-war dissent?",
        choices:[
          { text:"Enforce both acts fully — wartime security demands unified public support, even at the cost of civil liberties.", consequence:"Debs receives a 10-year sentence. Over 2,000 people are prosecuted. The war effort remains unified — but the legal precedents haunt future generations whenever a government claims emergency powers.", meters:{militarism:14,nationalism:10,alliances:-6} },
          { text:"Enforce the Espionage Act but push back against the Sedition Act — criticism of policy is not the same as sabotage.", consequence:"You preserve a fragile distinction between dissent and disloyalty. Some wartime unity is lost. Civil liberties are partially protected for the next generation.", meters:{alliances:10,nationalism:-4,militarism:4} },
          { text:"Advocate internally for limiting prosecution to actual saboteurs — free speech must survive even in wartime.", consequence:"You are overruled. The prosecutions proceed. But your dissent creates an internal record that matters when the war ends and civil liberties lawyers begin the work of reconstruction.", meters:{alliances:14,nationalism:-8} },
        ]},
    ],
    hinge:{
      question:"The First World War marked a fundamental shift in the nature of warfare. Which statement BEST defines the concept of 'total war' as demonstrated by the WWI home front experience?",
      choices:["Total war means that both sides fight until one is completely destroyed, with no possibility of negotiated peace","Total war requires the complete mobilization of a society's economy, population, and resources — making civilians as central to the war effort as soldiers","Total war is characterized by the use of new and more destructive weapons, including chemical agents and aerial bombardment","Total war describes a conflict that spans multiple continents and involves nations from around the world simultaneously"],
      correct:1,
      explanation:"Total war is defined by the complete mobilization of society — not just armies, but economies, industries, populations, and psychology. WWI introduced this concept to modern history at an unprecedented scale: governments rationed food, conscripted labor, controlled media, suppressed dissent, and mobilized women and minority workers. The home front became as strategically important as the battlefield. This is what distinguishes total war from earlier conflicts. The Regents exam tests this concept directly — expect to identify total war characteristics using specific WWI home front examples like the Committee on Public Information, war bond drives, rationing, and the Espionage and Sedition Acts.",
    },
  },
  {
    num:"V", title:"America's Choice", standard:"NYSED Standard 10.4d",
    role:"United States Senator", years:"1914 - 1917", accentColor:"#243B55",
    quote:`"He kept us out of war." - 1916 Democratic campaign slogan for Woodrow Wilson`,
    ctxHeading:"Washington D.C., 1914 - 1917",
    ctxText:`When war erupted in Europe in August 1914, President Woodrow Wilson asked Americans to be "neutral in fact as well as in name." For two and a half years, the United States walked a razor's edge.\n\nBut neutrality was never truly neutral. American banks loaned billions to Britain and France. American factories shipped munitions to the Allies. American passengers booked passage on British ocean liners sailing through a submarine war zone.\n\nThen: the Lusitania (May 1915, 1,198 dead including 128 Americans). The Sussex Pledge. The Zimmermann Telegram. Unrestricted submarine warfare resumed in February 1917.\n\nOn April 2, 1917, Woodrow Wilson asked Congress for a declaration of war against Germany. Four days later, Congress voted. The Senate margin: 82 to 6.\n\nYou are a United States Senator. You must decide — at each critical moment — whether America stays out or steps in.`,
    decisions:[
      { year:"May 1915 - The Lusitania", situation:"The British ocean liner RMS Lusitania has been sunk by a German U-boat off the coast of Ireland. 1,198 people are dead, including 128 American citizens. Germany had warned in newspaper advertisements that ships in the war zone were targets. The American public is outraged. Wilson is drafting a protest note.", question:"How do you respond to the sinking of the Lusitania?",
        choices:[
          { text:"Call for an immediate declaration of war — American lives have been taken and neutrality is no longer sustainable.", consequence:"Wilson rejects the call for war — public opinion is not yet there. 'He kept us out of war' will become a campaign slogan used against your position. But you are not wrong about where this is heading.", meters:{militarism:14,nationalism:12,alliances:-5} },
          { text:"Support Wilson's strongly-worded diplomatic protest — demand Germany pledge to stop attacking passenger ships.", consequence:"Wilson sends three protest notes. Germany eventually issues the Sussex Pledge, promising to restrict submarine warfare. The crisis eases — temporarily. For two more years, neutrality holds.", meters:{alliances:12,nationalism:8,militarism:4} },
          { text:"Maintain strict neutrality — Americans traveling through a war zone assumed the risk. This is not our war.", consequence:"Your position reflects significant public sentiment, particularly in the Midwest and among German-American communities. It becomes increasingly difficult to defend as the death toll grows.", meters:{nationalism:-6,alliances:6,militarism:-3} },
        ]},
      { year:"February 1917 - Escalation", situation:"Germany has announced it will resume unrestricted submarine warfare — attacking any ship, including American vessels, in a designated war zone. Wilson has broken off diplomatic relations. The Zimmermann Telegram — Germany's secret proposal to Mexico to attack the United States in exchange for help recovering Texas, New Mexico, and Arizona — has just been published in American newspapers.", question:"How do you respond to Germany's escalation and the Zimmermann Telegram?",
        choices:[
          { text:"Introduce a resolution calling for a declaration of war — Germany has made neutrality impossible.", consequence:"You are ahead of Wilson, who still wants to exhaust diplomatic options. But the telegram and submarine war are doing your work for you. The public mood is shifting rapidly.", meters:{militarism:16,nationalism:14,alliances:5} },
          { text:"Support 'armed neutrality' — arm American merchant ships without formally entering the war.", consequence:"Wilson attempts this. A Senate filibuster by anti-war senators blocks it. Wilson arms the ships by executive order anyway. The measure buys time, but not much.", meters:{militarism:8,nationalism:6,alliances:4} },
          { text:"Continue opposing intervention — the Zimmermann Telegram may be British propaganda designed to pull us into the war.", consequence:"Your skepticism is not unreasonable — British intelligence did intercept and selectively release the telegram. But the submarines are real, and so are the American merchant sailors dying in the Atlantic.", meters:{nationalism:-8,alliances:8,militarism:-4} },
        ]},
      { year:"April 6, 1917 - The Vote", situation:"President Wilson has asked Congress for a declaration of war. He has called it 'a war to make the world safe for democracy.' The vote is before you now. Fifty thousand Americans may die. The world will never be the same. Six senators will vote no. The rest will vote yes.", question:"How do you vote on the declaration of war against Germany?",
        choices:[
          { text:"Vote yes — Germany's actions have made war inevitable, and America must fight on the right side of history.", consequence:"You vote with 82 of your colleagues. America enters the war. 116,516 Americans will die before it ends. The war concludes in November 1918. What comes next — the peace — will prove harder than the war itself.", meters:{militarism:18,nationalism:14,alliances:8} },
          { text:"Vote no — no foreign war is worth American lives, and Wilson's idealism will lead only to betrayal at the peace table.", consequence:"You are one of six. History will debate whether you were a principled isolationist or a dangerous obstructionist. Your warning about the peace table, however, will prove accurate.", meters:{nationalism:-10,alliances:10,militarism:-8} },
          { text:"Vote yes, but deliver a floor speech demanding Wilson honor the 14 Points at any peace conference.", consequence:"Your speech enters the Congressional Record. You vote yes. Your instinct — to shape the peace before the war ends — is sound. Almost no one listens. Until it is too late.", meters:{militarism:12,alliances:14,nationalism:5} },
        ]},
    ],
    hinge:{
      question:"The United States maintained neutrality from 1914 to 1917 before entering World War I. Which factor MOST directly caused the United States to enter the war in April 1917?",
      choices:["The sinking of the Lusitania in 1915 and the deaths of 128 American citizens","American economic ties to Britain and France through billions in war loans and munitions sales","Germany's resumption of unrestricted submarine warfare and the Zimmermann Telegram in early 1917","Woodrow Wilson's belief that American participation was necessary to shape a just and lasting peace"],
      correct:2,
      explanation:"The Regents answer is Germany's resumption of unrestricted submarine warfare combined with the Zimmermann Telegram — the immediate triggers that made continued neutrality politically and practically impossible in early 1917. The Lusitania (1915) produced outrage but not war — Wilson kept the United States neutral for two more years after it. Economic ties to the Allies were real but not sufficient to force intervention. Wilson's idealism mattered, but ideas don't vote in Congress. The German submarine campaign — directly threatening American ships and killing American sailors — created the political conditions for the April 6 vote. The key Regents skill: distinguish between long-term background causes and the immediate trigger of a specific historical event.",
    },
  },
  {
    num:"VI", title:"The Peace Table", standard:"NYSED Standard 10.4e",
    role:"American Delegate, Paris Peace Conference", years:"January - June 1919", accentColor:"#3A2A5C",
    quote:`"This is not a peace. It is an armistice for twenty years." - Ferdinand Foch, Supreme Allied Commander, upon reading the Treaty of Versailles, 1919`,
    ctxHeading:"Paris, January - June 1919",
    ctxText:`The war ended on November 11, 1918, at 11:00 AM. Approximately 20 million people were dead. The survivors now had to decide what the world would look like afterward.\n\nThe Paris Peace Conference brought together the leaders of 27 nations. But real power rested with four men: Wilson (United States), Lloyd George (Britain), Clemenceau (France), and Orlando (Italy). Germany was not invited. The defeated nations would accept whatever was decided for them.\n\nWilson arrived with his Fourteen Points — a blueprint for a just peace based on self-determination, open diplomacy, and a League of Nations. Clemenceau arrived with a different goal entirely: to punish Germany so completely that it could never again threaten France.\n\nYou are an American delegate. The decisions made in this room will shape the next twenty years — and the world that follows them.`,
    decisions:[
      { year:"February 1919 - Article 231", situation:"The 'War Guilt Clause' (Article 231) would require Germany to accept complete responsibility for causing the war and all its damages. France demands it as the legal foundation for reparations. Wilson's advisors warn it will be seen as humiliating and historically inaccurate. Germany had allies. Germany did not act alone.", question:"How do you approach the War Guilt Clause?",
        choices:[
          { text:"Support Article 231 fully — Germany bears primary responsibility and must accept this as the legal foundation for reparations.", consequence:"The clause is written into the treaty. German delegates sign under protest, calling it the 'diktat.' German politicians will exploit this humiliation for decades. A young Austrian veteran named Adolf Hitler will build his entire movement on reversing it.", meters:{nationalism:16,militarism:10,alliances:-14} },
          { text:"Oppose the War Guilt Clause — shared responsibility is more historically accurate and more politically sustainable.", consequence:"France is furious. Clemenceau threatens to walk out. You hold the line on historical accuracy but lose political capital you will need when fighting for the League of Nations.", meters:{alliances:14,nationalism:-6,militarism:-4} },
          { text:"Propose a modified clause acknowledging German responsibility without exclusive guilt — a compromise position.", consequence:"The clause that emerges still humiliates Germany, but with slightly more legal nuance. Historians will debate for a century whether the difference mattered at all.", meters:{alliances:6,nationalism:4,militarism:3} },
        ]},
      { year:"April 1919 - Reparations", situation:"The Allied Reparations Commission is considering demanding $33 billion from Germany — an amount that economist John Maynard Keynes warns will destroy the German economy and destabilize all of Europe. France wants maximum payment. Britain needs German trade to recover. Wilson wants a figure Germany can actually pay.", question:"What position do you take on German war reparations?",
        choices:[
          { text:"Support maximum reparations — Germany must pay for the destruction it caused, regardless of economic consequences.", consequence:"$33 billion becomes the final figure. Keynes resigns from the British delegation and publishes 'The Economic Consequences of the Peace,' predicting — accurately — what hyperinflation and resentment will produce.", meters:{militarism:12,imperialism:8,alliances:-10,nationalism:10} },
          { text:"Advocate for a reduced, realistic reparations figure Germany could actually pay over time.", consequence:"You are overruled by France. The high figure stands. But your position is vindicated in 1923 when Germany defaults and France occupies the Ruhr, triggering the hyperinflation that wipes out the German middle class.", meters:{alliances:12,militarism:-4,nationalism:-4} },
          { text:"Argue against reparations entirely — a punitive peace will guarantee another war within a generation.", consequence:"Clemenceau dismisses you. Wilson does not fully back you. Ferdinand Foch will call the resulting treaty 'an armistice for twenty years.' He will be proven correct almost to the calendar year.", meters:{alliances:16,militarism:-8,nationalism:-8} },
        ]},
      { year:"June 1919 - The League of Nations", situation:"Wilson's Fourteen Points have been largely abandoned in the negotiations. But the League of Nations — his mechanism for resolving future conflicts peacefully — has survived in the final treaty. Back in Washington, Senator Henry Cabot Lodge is leading opposition, arguing the League surrenders American sovereignty. Wilson must decide: compromise or fight.", question:"How do you advise Wilson on the Senate fight for the League of Nations?",
        choices:[
          { text:"Fight for the League without any amendments — compromise now will only invite more demands from Lodge.", consequence:"Wilson takes this advice. He goes on a national speaking tour, collapses from a stroke, and is incapacitated for 17 months. The Senate rejects the treaty twice. The United States never joins the League.", meters:{alliances:-16,nationalism:8,militarism:4} },
          { text:"Urge Wilson to accept Lodge's reservations — a modified League is better than no League at all.", consequence:"Wilson refuses. He will not yield. Historians will debate for a century whether this stubbornness was the fatal mistake. The League forms without America — and without real power to stop the next war.", meters:{alliances:-8,nationalism:4,militarism:2} },
          { text:"Accept the Lodge reservations and preserve American participation — a League with conditions beats no League.", consequence:"Wilson cannot be persuaded. Your position reflects what most internationalist historians believe in hindsight was the only path to a functioning League. The opportunity is lost.", meters:{alliances:14,nationalism:-4,militarism:-4} },
        ]},
    ],
    hinge:{
      question:"The Treaty of Versailles (1919) has been called both a necessary peace and a catastrophic failure. Which provision of the treaty had the GREATEST long-term consequences for European stability?",
      choices:["The creation of new nations in Eastern Europe based on the principle of national self-determination","The War Guilt Clause and reparations, which humiliated Germany economically and politically without eliminating its capacity for revenge","The League of Nations, which created an international body too weak to enforce the peace it was designed to protect","The territorial losses imposed on Germany, including Alsace-Lorraine and the Polish Corridor"],
      correct:1,
      explanation:"The War Guilt Clause combined with the reparations burden is the Regents answer — and the most historically defensible one. The clause humiliated Germany without eliminating its economic and military potential. The reparations ($33 billion) created the economic instability that produced hyperinflation in 1923, then catastrophic unemployment after 1929, and the political conditions in which Adolf Hitler's movement could promise national restoration. Hitler's entire program was built on reversing Versailles. Ferdinand Foch was not speaking rhetorically when he called the result 'an armistice for twenty years' — he was right almost to the calendar year. The Regents exam will ask you to connect specific Versailles provisions to the rise of fascism and the outbreak of WWII.",
    },
  },
  {
    num:"VII", title:"The Verdict", standard:"NYSED Standard 10.4f",
    role:"Historian — Twenty Years Later", years:"1919 - 1939", accentColor:"#4A1A1A",
    quote:`"The war to end all wars has become the prologue to something worse." - unnamed diplomat, Geneva, 1933`,
    ctxHeading:"Europe, 1919 - 1939",
    ctxText:`The guns fell silent on November 11, 1918. The war was over.\n\nBut the consequences were only beginning.\n\nThe Treaty of Versailles reshaped the map of Europe, dissolved empires, created new nations, and humiliated Germany without eliminating its power. The League of Nations emerged without its most powerful potential member and proved unable to stop aggression when tested.\n\nIn Germany: hyperinflation in 1923 destroyed the savings of the middle class. The Great Depression after 1929 produced 30% unemployment. Political extremism filled the vacuum. Adolf Hitler was appointed Chancellor in January 1933. By 1935, Germany was openly rearming in violation of Versailles. By September 1939, the war was back.\n\nYou are a historian standing at the edge of 1939, looking back at twenty years of cascading consequences. Your task is the hardest one history assigns: understand how we got here — and whether any of it had to end this way.`,
    decisions:[
      { year:"1923 - The Ruhr Crisis", situation:"Germany has defaulted on reparations payments. France and Belgium have occupied the Ruhr valley — Germany's industrial heartland — to extract payment directly. Germany responds with passive resistance. To pay its striking workers, the German government prints money. By November 1923, it takes 4.2 trillion marks to buy one American dollar. The middle class's savings are gone.", question:"Looking back, what was the critical failure of the international community during the 1923 Ruhr crisis?",
        choices:[
          { text:"The failure to enforce reparations — Germany's default should have been met with immediate and overwhelming consequences.", consequence:"This position prioritizes French security concerns but ignores the economic reality Keynes had warned about. Enforcement without economic reform was always going to fail — and fail dangerously.", meters:{militarism:12,nationalism:8,alliances:-8} },
          { text:"The failure to immediately restructure reparations — the Dawes Plan in 1924 stabilized Germany, but came too late to prevent the political damage of hyperinflation.", consequence:"The Dawes Plan did work — briefly. American loans stabilized Germany from 1924 to 1929. Then the Depression called those loans back. The window of stability was far too narrow to build on.", meters:{alliances:12,militarism:-4,imperialism:-4} },
          { text:"The original sin — Versailles set reparations at a figure that made the Ruhr crisis structurally inevitable from the first day of signing.", consequence:"Keynes said this in 1919. The data proved him right. By the time the world recognized the error, an entire generation of Germans had been radicalized by economic humiliation — and were ready to be told who to blame.", meters:{alliances:16,nationalism:-6,militarism:-6} },
        ]},
      { year:"1933 - The Rise of Extremism", situation:"Adolf Hitler has been appointed Chancellor of Germany on January 30, 1933. He has promised to tear up the Treaty of Versailles, restore German greatness, and identify enemies — Jewish Germans, communists, the Weimar politicians — responsible for Germany's humiliation. Democratic governments across Europe are watching, uncertain how to respond.", question:"What was the appropriate international response to Hitler's appointment in January 1933?",
        choices:[
          { text:"Immediate, firm collective action through the League of Nations — appeasement of aggressive regimes never works.", consequence:"The League lacked both American participation and the political will to act. The call for collective action was correct — but structurally impossible without the mechanisms and membership to enforce it.", meters:{alliances:14,militarism:8,nationalism:5} },
          { text:"Diplomatic engagement — Hitler's extremism may moderate once he bears the actual responsibilities of governing.", consequence:"This is the logic of appeasement. It proved catastrophically wrong. Governing responsibility did not moderate Hitler — it gave him the tools to accelerate every element of his program.", meters:{alliances:-8,nationalism:8,militarism:-4} },
          { text:"Begin quiet rearmament and build anti-German coalitions before conflict becomes inevitable.", consequence:"Britain and France began this calculation too late and too slowly. The window for effective deterrence closed while democratic governments sought to avoid the political costs of preparation.", meters:{militarism:14,alliances:8,nationalism:3} },
        ]},
      { year:"1939 - The Question History Asks", situation:"On September 1, 1939, Germany invaded Poland. Britain and France declared war two days later. The Second World War had begun — twenty-one years after the armistice that was supposed to end all wars. The question now — the one every historian and every student must face — is this: was any of it inevitable?", question:"As a historian, how do you assess the path from 1914 to 1939?",
        choices:[
          { text:"WWI and WWII were essentially one continuous conflict — the 'peace' of 1919 was structurally guaranteed to produce a second war.", consequence:"This is the 'Thirty Years War' interpretation: 1914 to 1945 as a single crisis with an armistice in the middle. It is the most pessimistic reading of the evidence — but it is supported by it.", meters:{militarism:10,nationalism:10,alliances:-8} },
          { text:"WWII was not inevitable — specific decisions at Versailles, during the Ruhr crisis, and in 1933 could have produced different outcomes.", consequence:"This is the contingency argument: history is made by choices, not fate. At multiple moments, different decisions were available. They were not made. This interpretation places the weight on human agency — and human failure.", meters:{alliances:14,nationalism:-4,militarism:-4} },
          { text:"The deeper structural forces — the MAIN pressures of nationalism, militarism, and imperialism — made some form of major conflict nearly inevitable, even if its specific shape was not.", consequence:"This is the structural interpretation. The forces that built toward 1914 did not disappear with the armistice. They were redirected, suppressed, and then released again with new targets. The specific catastrophe of 1939 was shaped by choices — but the pressure was systemic.", meters:{alliances:5,nationalism:8,militarism:8,imperialism:6} },
        ]},
    ],
    hinge:{
      question:"A historian is evaluating the long-term consequences of World War I. Which statement provides the BEST historical argument connecting WWI to the outbreak of World War II?",
      choices:["WWI introduced such destructive weapons technology that a second conflict deploying those weapons was statistically inevitable within a generation","The Treaty of Versailles created economic and political conditions in Germany — humiliation, instability, and extremism — that made the rise of fascism and a second European war highly probable","The failure of the United States to join the League of Nations was the single factor most responsible for making World War II possible","Nationalism, which caused WWI, was never adequately addressed by the peacemakers at Versailles and therefore continued driving European conflict through 1939"],
      correct:1,
      explanation:"The strongest historical argument — and the Regents answer — connects the specific provisions of Versailles to the specific conditions that produced WWII. The War Guilt Clause humiliated Germany. Reparations destroyed economic stability. Territorial losses created political grievances. Together, they created the environment in which a movement promising national restoration could achieve democratic power — and then dismantle democracy. This is not a vague claim that 'nationalism caused everything.' It is a precise causal chain: Versailles terms → economic instability → political radicalization → Hitler's rise → WWII. The Regents exam rewards this kind of specific, evidence-based causal argument. This analytical skill — building a specific argument with evidence — is exactly what Document-Based Questions require.",
    },
  },
];

const SEEDS_VERDICT = [
  { max:8,  label:"The Statesman",           color:"#4E9A5E", msg:"Across seven chapters of crisis, your choices consistently prioritized diplomacy, institutional stability, and the long view over short-term aggression. History records you as a voice of reason in an era that had very few." },
  { max:20, label:"The Reluctant Hawk",       color:"#C9A54C", msg:"Your choices reflected the genuine tensions of the era — moments of restraint alongside moments of escalation. You were neither the cause of catastrophe nor its cure. Most historical actors fall into this category." },
  { max:35, label:"The Architect of Crisis",  color:"#C47020", msg:"Your decisions accelerated many of the forces historians link to the interwar catastrophe. The militarism you enabled, the alliances you weakened, the nationalisms you inflamed — they did not disappear when the guns fell silent." },
  { max:999,label:"The Engine of War",        color:"#C41E1E", msg:"Across seven chapters, your choices echo through the historical record. The pressure you added to every gauge, the diplomacy you abandoned, the aggression you enabled — historians tracing the path to 1939 would find your fingerprints at every turning point." },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');
html,body,#root{width:100%;min-height:100vh;margin:0;padding:0;}
*{box-sizing:border-box;margin:0;padding:0;}
.wof{width:100%;min-height:100vh;background:#0f0d0b;color:#f0e8d8;font-family:'Crimson Pro',Georgia,serif;font-size:20px;line-height:1.7;}
.screen{position:relative;z-index:1;animation:fadeUp .45s ease both;width:100%;}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
@keyframes warFlash{0%,100%{background:transparent;}40%{background:rgba(139,21,21,.35);}}
@keyframes pulse{0%,100%{opacity:.7;}50%{opacity:1;}}

.main-panel{position:sticky;top:0;z-index:100;background:rgba(8,6,4,.98);backdrop-filter:blur(10px);border-bottom:2px solid rgba(201,165,76,.2);}
.main-panel-inner{display:flex;align-items:stretch;width:100%;}
.main-label-col{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:12px 18px;border-right:2px solid rgba(201,165,76,.18);min-width:72px;background:rgba(201,165,76,.04);}
.main-acronym{font-family:'Cinzel',serif;font-size:22px;font-weight:900;color:#D4AE56;letter-spacing:.1em;line-height:1;}
.main-word{font-family:'Cinzel',serif;font-size:8px;letter-spacing:.22em;color:rgba(212,174,86,.4);text-transform:uppercase;margin-top:4px;}
.main-gauges{display:flex;flex:1;}
.mg-item{flex:1;display:flex;flex-direction:column;justify-content:center;padding:12px 16px;border-right:1px solid rgba(255,255,255,.05);transition:background .3s;}
.mg-item:last-child{border-right:none;}
.mg-item.high{background:rgba(196,30,30,.06);}
.mg-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:7px;}
.mg-name{font-family:'Cinzel',serif;font-size:12px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;}
.mg-val{font-family:'Cinzel',serif;font-size:24px;font-weight:900;line-height:1;transition:all .6s;}
.mg-track{height:10px;background:rgba(255,255,255,.08);border-radius:5px;overflow:hidden;margin-bottom:5px;}
.mg-fill{height:100%;border-radius:5px;transition:width 1s cubic-bezier(.4,0,.2,1);}
.mg-desc{font-size:11px;color:rgba(240,232,216,.35);letter-spacing:.03em;}

.content{max-width:880px;width:100%;margin:0 auto;padding:52px 48px 88px;}
.gold-div{width:100%;height:1px;background:linear-gradient(to right,transparent,rgba(201,165,76,.3),transparent);margin:32px 0;}
.red-bar{width:44px;height:3px;background:#C41E1E;margin-bottom:28px;}

.btn{font-family:'Cinzel',serif;font-size:12px;letter-spacing:.22em;text-transform:uppercase;background:transparent;border:1px solid rgba(201,165,76,.65);color:#D4AE56;padding:14px 52px;cursor:pointer;transition:all .25s;border-radius:4px;display:inline-block;}
.btn:hover:not(:disabled){background:rgba(201,165,76,.09);border-color:#D4AE56;color:#f0e8d8;box-shadow:0 0 28px rgba(201,165,76,.14);}
.btn:disabled{opacity:.28;cursor:not-allowed;}
.btn-red{border-color:rgba(196,30,30,.6);color:rgba(225,85,85,.95);}
.btn-red:hover:not(:disabled){background:rgba(196,30,30,.09);border-color:#C41E1E;color:#f0e8d8;}
.btn-ghost{border-color:rgba(240,232,216,.18);color:rgba(240,232,216,.4);font-size:11px;padding:10px 28px;}
.btn-ghost:hover:not(:disabled){border-color:rgba(240,232,216,.35);color:rgba(240,232,216,.7);background:transparent;box-shadow:none;}

.title-screen{min-height:100vh;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:48px 40px;position:relative;overflow:hidden;background:#0a0806;}
.title-screen::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 80%,rgba(139,21,21,.28) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(201,165,76,.08) 0%,transparent 45%),radial-gradient(ellipse at 50% 50%,rgba(80,50,20,.15) 0%,transparent 70%);z-index:0;}
.title-content{position:relative;z-index:2;}
.t-year{font-family:'Cinzel',serif;font-size:clamp(80px,15vw,164px);font-weight:900;color:#f0e8d8;letter-spacing:-.02em;line-height:.88;text-shadow:0 0 120px rgba(196,30,30,.5),0 0 60px rgba(196,30,30,.25),0 4px 32px rgba(0,0,0,.98);}
.t-sub{font-family:'Cinzel',serif;font-size:clamp(13px,2.2vw,20px);letter-spacing:.44em;color:#D4AE56;text-transform:uppercase;margin-top:14px;}
.t-div{width:210px;height:1px;background:linear-gradient(to right,transparent,rgba(201,165,76,.6),transparent);margin:28px auto 40px;}
.wof-input{background:rgba(10,8,6,.8);border:1px solid rgba(240,232,216,.22);color:#f0e8d8;font-family:'Crimson Pro',Georgia,serif;font-size:18px;padding:12px 20px;border-radius:4px;outline:none;transition:border-color .2s;width:230px;}
.wof-input:focus{border-color:rgba(201,165,76,.7);}
.wof-input::placeholder{color:rgba(240,232,216,.28);}

.ch-intro{min-height:100vh;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:48px 40px;position:relative;overflow:hidden;}
.ch-intro-content{position:relative;z-index:2;}
.ch-eyebrow{font-family:'Cinzel',serif;font-size:12px;letter-spacing:.3em;color:#D4AE56;text-transform:uppercase;margin-bottom:16px;}
.ch-number{font-family:'Cinzel',serif;font-size:clamp(52px,11vw,112px);font-weight:900;color:#f0e8d8;line-height:1;margin-bottom:10px;}
.ch-subtitle{font-family:'Cinzel',serif;font-size:clamp(20px,4vw,40px);color:#D4AE56;letter-spacing:.07em;margin-bottom:32px;}
.ch-pill{display:inline-block;border:1px solid rgba(196,30,30,.6);background:rgba(0,0,0,.4);color:rgba(240,232,216,.9);font-family:'Cinzel',serif;font-size:11px;letter-spacing:.2em;text-transform:uppercase;padding:8px 22px;border-radius:3px;margin-bottom:12px;}
.ch-years{font-size:16px;color:rgba(240,232,216,.5);letter-spacing:.14em;margin-bottom:44px;}
.ch-standard{font-size:14px;color:rgba(201,165,76,.55);letter-spacing:.08em;margin-top:22px;}

.quote-block{border-left:3px solid rgba(201,165,76,.5);padding:20px 28px;margin-bottom:36px;background:rgba(201,165,76,.04);border-radius:0 4px 4px 0;}
.quote-text{font-size:19px;line-height:1.7;color:rgba(240,232,216,.85);font-style:italic;}

.ctx-eyebrow{font-family:'Cinzel',serif;font-size:12px;letter-spacing:.28em;color:#D4AE56;text-transform:uppercase;margin-bottom:8px;}
.ctx-line{width:42px;height:2px;background:#C41E1E;margin-bottom:28px;}
.ctx-text{font-size:21px;line-height:1.88;color:#f0e8d8;font-style:italic;white-space:pre-line;}
.ctx-note{margin-top:32px;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.18em;color:rgba(240,232,216,.3);text-transform:uppercase;}

.htp-screen{min-height:100vh;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:52px 40px;}
.htp-inner{max-width:760px;width:100%;}
.htp-title{font-family:'Cinzel',serif;font-size:clamp(22px,4vw,38px);font-weight:700;color:#f0e8d8;margin-bottom:8px;}
.htp-sub{font-size:18px;color:rgba(240,232,216,.5);margin-bottom:40px;font-style:italic;}
.htp-cards{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:36px;}
.htp-card{background:rgba(255,255,255,.025);border:1px solid rgba(240,232,216,.09);border-radius:6px;padding:24px;}
.htp-card-num{font-family:'Cinzel',serif;font-size:30px;font-weight:900;color:rgba(212,174,86,.45);margin-bottom:10px;line-height:1;}
.htp-card-title{font-family:'Cinzel',serif;font-size:14px;letter-spacing:.13em;text-transform:uppercase;color:#D4AE56;margin-bottom:10px;}
.htp-card-text{font-size:17px;line-height:1.68;color:rgba(240,232,216,.82);}
.main-explainer{background:rgba(201,165,76,.04);border:1px solid rgba(201,165,76,.18);border-radius:6px;padding:24px 28px;margin-bottom:36px;}
.main-exp-title{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#D4AE56;margin-bottom:18px;}
.main-exp-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.main-exp-item{display:flex;gap:12px;align-items:flex-start;}
.main-exp-dot{width:12px;height:12px;border-radius:50%;margin-top:5px;flex-shrink:0;}
.main-exp-label{font-size:16px;font-weight:600;}
.main-exp-desc{font-size:15px;color:rgba(240,232,216,.65);}

.hub-screen{min-height:100vh;width:100%;display:flex;flex-direction:column;}
.hub-header{padding:44px 52px 32px;border-bottom:1px solid rgba(240,232,216,.07);}
.hub-pretitle{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.28em;color:rgba(212,174,86,.5);text-transform:uppercase;margin-bottom:8px;}
.hub-title{font-family:'Cinzel',serif;font-size:clamp(24px,4vw,42px);font-weight:900;color:#f0e8d8;margin-bottom:8px;}
.hub-player{font-size:17px;color:rgba(240,232,216,.45);font-style:italic;}
.hub-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;padding:36px 52px 48px;}
.hub-card{border-radius:6px;padding:24px 26px;position:relative;display:flex;flex-direction:column;gap:5px;transition:all .22s;}
.hub-card.available{border:1px solid rgba(201,165,76,.3);background:rgba(201,165,76,.03);cursor:pointer;}
.hub-card.available:hover{border-color:rgba(201,165,76,.65);background:rgba(201,165,76,.07);transform:translateY(-3px);box-shadow:0 10px 36px rgba(0,0,0,.5);}
.hub-card.completed{border:1px solid rgba(78,154,94,.35);background:rgba(78,154,94,.04);cursor:pointer;}
.hub-card.completed:hover{border-color:rgba(78,154,94,.65);background:rgba(78,154,94,.08);transform:translateY(-3px);box-shadow:0 10px 36px rgba(0,0,0,.5);}
.hub-card.locked{border:1px solid rgba(240,232,216,.08);background:rgba(255,255,255,.01);cursor:not-allowed;opacity:.4;}
.hub-ch-num{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.2em;color:rgba(240,232,216,.38);text-transform:uppercase;}
.hub-ch-title{font-family:'Cinzel',serif;font-size:20px;font-weight:700;color:#f0e8d8;line-height:1.25;margin-top:2px;}
.hub-ch-std{font-size:14px;color:#D4AE56;margin-top:4px;}
.hub-ch-topic{font-size:14px;color:rgba(240,232,216,.5);margin-top:3px;}
.hub-badge{position:absolute;top:18px;right:20px;font-family:'Cinzel',serif;font-size:10px;letter-spacing:.14em;text-transform:uppercase;padding:4px 11px;border-radius:3px;}
.badge-done{background:rgba(78,154,94,.14);color:rgba(120,200,140,.92);border:1px solid rgba(78,154,94,.32);}
.badge-play{background:rgba(201,165,76,.1);color:rgba(212,174,86,.92);border:1px solid rgba(201,165,76,.32);}
.badge-lock{background:rgba(255,255,255,.04);color:rgba(240,232,216,.28);border:1px solid rgba(255,255,255,.07);}
.hub-footer{padding:0 52px 40px;display:flex;gap:16px;}

.dec-progress{display:flex;gap:10px;margin-bottom:36px;}
.pip{width:34px;height:5px;border-radius:3px;background:rgba(255,255,255,.08);transition:background .35s;}
.pip.active{background:#D4AE56;}
.pip.done{background:rgba(201,165,76,.38);}
.dec-year{font-family:'Cinzel',serif;font-size:12px;letter-spacing:.28em;color:#D4AE56;text-transform:uppercase;margin-bottom:16px;}
.dec-situation{font-size:20px;color:#f0e8d8;line-height:1.8;margin-bottom:30px;border-left:3px solid rgba(201,165,76,.4);padding:6px 0 6px 22px;}
.dec-question{font-family:'Cinzel',serif;font-size:19px;color:#f0e8d8;margin-bottom:26px;line-height:1.5;font-weight:600;}
.choices{display:flex;flex-direction:column;gap:13px;margin-bottom:34px;}
.choice{border:1px solid rgba(240,232,216,.12);background:rgba(255,255,255,.018);border-radius:6px;padding:19px 24px;cursor:pointer;transition:all .2s;display:flex;gap:16px;align-items:flex-start;}
.choice:hover{border-color:rgba(201,165,76,.55);background:rgba(201,165,76,.05);transform:translateX(4px);}
.choice.sel{border-color:rgba(201,165,76,.8);background:rgba(201,165,76,.08);}
.ch-ltr{font-family:'Cinzel',serif;font-size:14px;font-weight:700;color:#D4AE56;min-width:20px;margin-top:2px;}
.ch-txt{font-size:19px;line-height:1.6;color:#f0e8d8;}

.con-tag{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.28em;color:rgba(220,80,80,.9);text-transform:uppercase;margin-bottom:14px;}
.con-echo{font-size:17px;color:rgba(240,232,216,.52);font-style:italic;border-left:3px solid rgba(196,30,30,.5);padding:8px 20px;margin-bottom:28px;}
.con-text{font-size:22px;line-height:1.85;color:#f0e8d8;margin-bottom:36px;}
.meter-changes{display:flex;flex-wrap:wrap;gap:11px;margin-bottom:36px;}
.mc-pill{font-family:'Cinzel',serif;font-size:13px;letter-spacing:.1em;padding:7px 16px;border-radius:3px;border:1px solid;}

.hinge-tag{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.28em;color:#D4AE56;text-transform:uppercase;margin-bottom:8px;}
.hinge-q{font-family:'Cinzel',serif;font-size:20px;line-height:1.6;color:#f0e8d8;margin-bottom:30px;font-weight:600;}
.h-choice{border:1px solid rgba(240,232,216,.12);background:rgba(255,255,255,.018);border-radius:6px;padding:18px 24px;cursor:pointer;transition:all .2s;display:flex;gap:16px;align-items:flex-start;margin-bottom:12px;}
.h-choice:not(.revealed):hover{border-color:rgba(201,165,76,.5);background:rgba(201,165,76,.05);transform:translateX(4px);}
.h-choice.h-correct{border-color:rgba(78,154,94,.85);background:rgba(78,154,94,.08);}
.h-choice.h-wrong{border-color:rgba(196,30,30,.35);opacity:.5;}
.h-choice.h-sel-wrong{border-color:rgba(196,30,30,.85);background:rgba(196,30,30,.09);}
.h-ltr{font-family:'Cinzel',serif;font-size:14px;font-weight:700;color:#D4AE56;min-width:20px;margin-top:2px;}
.h-txt{font-size:19px;line-height:1.55;color:#f0e8d8;}
.explain-box{background:rgba(201,165,76,.06);border:1px solid rgba(201,165,76,.28);border-radius:6px;padding:26px 30px;margin-top:28px;animation:fadeUp .45s ease both;}
.explain-label{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.25em;color:#D4AE56;text-transform:uppercase;margin-bottom:14px;}
.explain-text{font-size:19px;line-height:1.78;color:#f0e8d8;}
.correct-banner{background:rgba(78,154,94,.12);border:1px solid rgba(78,154,94,.4);border-radius:4px;padding:13px 20px;margin-bottom:24px;font-family:'Cinzel',serif;font-size:13px;letter-spacing:.15em;color:rgba(120,210,140,.95);text-transform:uppercase;}
.wrong-banner{background:rgba(196,30,30,.1);border:1px solid rgba(196,30,30,.38);border-radius:4px;padding:13px 20px;margin-bottom:24px;font-family:'Cinzel',serif;font-size:13px;letter-spacing:.15em;color:rgba(230,100,100,.95);text-transform:uppercase;}

.war-screen{min-height:100vh;width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:48px 40px;animation:warFlash 1.6s ease forwards;background:radial-gradient(ellipse at center,rgba(80,10,10,.6) 0%,rgba(8,4,4,.98) 70%);}
.war-title{font-family:'Cinzel',serif;font-size:clamp(32px,7vw,70px);font-weight:900;color:#C41E1E;margin-bottom:12px;text-shadow:0 0 80px rgba(196,30,30,.8),0 0 30px rgba(196,30,30,.4);letter-spacing:.04em;}
.war-subtitle{font-family:'Cinzel',serif;font-size:16px;letter-spacing:.22em;color:rgba(240,232,216,.5);text-transform:uppercase;margin-bottom:52px;}
.war-cascade{display:flex;flex-direction:column;max-width:600px;width:100%;text-align:left;margin-bottom:52px;}
.war-event{display:flex;gap:22px;align-items:flex-start;padding:14px 0;border-bottom:1px solid rgba(240,232,216,.08);}
.war-date{font-family:'Cinzel',serif;font-size:12px;letter-spacing:.15em;color:#D4AE56;min-width:104px;margin-top:3px;text-transform:uppercase;}
.war-evt-text{font-size:18px;line-height:1.55;color:rgba(240,232,216,.84);}
.war-evt-text.bold{color:#f0e8d8;font-weight:600;}

.end-eyebrow{font-family:'Cinzel',serif;font-size:12px;letter-spacing:.28em;color:#D4AE56;text-transform:uppercase;margin-bottom:10px;}
.end-title{font-family:'Cinzel',serif;font-size:clamp(28px,5vw,52px);font-weight:700;color:#f0e8d8;margin-bottom:40px;}
.meters-2col{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:34px;}
.m-block{background:rgba(255,255,255,.025);border:1px solid rgba(240,232,216,.08);border-radius:6px;padding:18px 22px;}
.m-block-label{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:rgba(240,232,216,.55);margin-bottom:8px;}
.m-block-val{font-family:'Cinzel',serif;font-size:36px;font-weight:900;margin-bottom:8px;line-height:1;}
.m-block-track{height:5px;background:rgba(255,255,255,.07);border-radius:3px;}
.m-block-fill{height:100%;border-radius:3px;transition:width 1.1s cubic-bezier(.4,0,.2,1);}
.hinge-result-block{border-radius:6px;padding:18px 24px;margin-bottom:28px;border:1px solid;}
.result-correct{background:rgba(78,154,94,.08);border-color:rgba(78,154,94,.38);}
.result-wrong{background:rgba(196,30,30,.07);border-color:rgba(196,30,30,.28);}
.seeds-warn{background:rgba(196,30,30,.07);border:1px solid rgba(196,30,30,.24);border-radius:6px;padding:16px 22px;margin-bottom:28px;font-size:17px;color:rgba(240,232,216,.82);font-style:italic;}
.verdict-card{border-radius:8px;padding:28px 32px;margin-bottom:28px;border:2px solid;}
.verdict-label{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.3em;text-transform:uppercase;margin-bottom:10px;}
.verdict-title{font-family:'Cinzel',serif;font-size:28px;font-weight:900;margin-bottom:14px;}
.verdict-seeds{font-family:'Cinzel',serif;font-size:13px;letter-spacing:.18em;margin-bottom:18px;opacity:.6;text-transform:uppercase;}
.verdict-msg{font-size:19px;line-height:1.75;color:rgba(240,232,216,.9);}

@media (max-width:640px){
  .main-gauges{flex-wrap:wrap;}
  .mg-item{flex:1 1 50%;border-right:none;border-bottom:1px solid rgba(255,255,255,.05);}
  .mg-item:nth-child(odd){border-right:1px solid rgba(255,255,255,.05);}
  .mg-item:nth-child(3),.mg-item:nth-child(4){border-bottom:none;}
  .main-label-col{padding:10px 12px;min-width:56px;}
  .main-acronym{font-size:18px;}
  .content{padding:28px 18px 64px;}
  .hub-grid{grid-template-columns:1fr;padding:20px 16px;}
  .hub-header{padding:28px 20px 20px;}
  .hub-footer{padding:0 16px 32px;}
  .htp-screen{padding:36px 20px;}
  .htp-cards{grid-template-columns:1fr;}
  .main-exp-grid{grid-template-columns:1fr;}
  .meters-2col{grid-template-columns:1fr;}
  .war-cascade{padding:0;}
  .war-event{flex-direction:column;gap:4px;padding:12px 0;}
  .war-date{min-width:unset;}
  .war-screen{padding:36px 20px;}
  .ch-intro{padding:32px 20px;}
  .hinge-q{font-size:17px;}
  .dec-situation{padding:6px 0 6px 14px;font-size:18px;}
  .dec-question{font-size:17px;}
  .ch-txt{font-size:17px;}
  .con-text{font-size:19px;}
  .ctx-text{font-size:18px;}
  .btn{padding:14px 28px;font-size:11px;}
  .title-screen{padding:36px 24px;}
  .wof-input{width:100%;}
  .explain-text{font-size:17px;}
  .h-txt{font-size:17px;}
}
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
        <div className="t-sub">A&nbsp;&nbsp;W O R L D&nbsp;&nbsp;O N&nbsp;&nbsp;F I R E</div>
        <div className="t-div" />
        {hasSave ? (
          <div style={{textAlign:"center",marginBottom:32}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:15,color:"rgba(240,232,216,.55)",letterSpacing:".12em",marginBottom:20}}>Welcome back, {savedName}</div>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn" onClick={()=>onStart("hub")}>Continue Your Journey</button>
              <button className="btn btn-ghost" onClick={()=>onStart("new")}>New Student</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{display:"flex",gap:16,marginBottom:32,flexWrap:"wrap",justifyContent:"center"}}>
              <input className="wof-input" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} />
              <input className="wof-input" placeholder="Class Period" value={period} onChange={e=>setPeriod(e.target.value)} />
            </div>
            <button className="btn" disabled={!name.trim()||!period.trim()} onClick={()=>onStart("howtoplay")}>Begin the Story</button>
          </>
        )}
        <div style={{marginTop:28,fontSize:14,color:"rgba(240,232,216,.32)",letterSpacing:".07em"}}>Global Studies &amp; Geography 10R &middot; Unit 6: The First World War</div>
        <div style={{marginTop:10,fontSize:13,color:"rgba(201,165,76,.5)",letterSpacing:".06em"}}>NYSED Standards 10.4a - 10.4f &middot; Seven Chapters</div>
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
        <div style={{background:"rgba(196,30,30,.06)",border:"1px solid rgba(196,30,30,.2)",borderRadius:6,padding:"16px 22px",marginBottom:32,fontSize:16,color:"rgba(240,232,216,.75)",fontStyle:"italic"}}>
          A hidden tracker called the <strong style={{color:"#C41E1E",fontStyle:"normal"}}>Seeds of Destruction</strong> accumulates across all seven chapters based on your decisions. It will be revealed at the end of Chapter VII.
        </div>
        <button className="btn" onClick={onContinue}>I'm Ready — Begin Chapter I</button>
      </div>
    </div>
  );
}

function ChapterHub({ name, period, completedChapters, seeds, onSelectChapter, onResetSave }) {
  const getStatus = (idx) => {
    if (completedChapters.includes(idx)) return "completed";
    if (idx === 0 || completedChapters.includes(idx-1)) return "available";
    return "locked";
  };
  return (
    <div className="hub-screen screen">
      <div className="hub-header">
        <div className="hub-pretitle">1914 &middot; A World on Fire</div>
        <div className="hub-title">Chapter Select</div>
        <div className="hub-player">{name} &nbsp;&middot;&nbsp; Period {period} &nbsp;&middot;&nbsp; {completedChapters.length} of {CHAPTERS.length} chapters complete</div>
      </div>
      <div className="hub-grid">
        {ALL_CHAPTER_META.map((ch,idx)=>{
          const status = getStatus(idx);
          const playable = status==="available"||status==="completed";
          return (
            <div key={ch.num} className={`hub-card ${status}`} onClick={()=>playable&&onSelectChapter(idx)}
              style={{borderLeft:playable?`3px solid ${ch.color}`:undefined}}>
              <div className="hub-ch-num">Chapter {ch.num}</div>
              <div className="hub-ch-title">{ch.title}</div>
              <div className="hub-ch-std">Standard {ch.std}</div>
              <div className="hub-ch-topic">{ch.topic}</div>
              <div className={`hub-badge ${status==="completed"?"badge-done":status==="available"?"badge-play":"badge-lock"}`}>
                {status==="completed"?"✓ Complete":status==="available"?"▶ Play":"🔒 Locked"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="hub-footer">
        <button className="btn btn-ghost" onClick={onResetSave}>Reset All Progress</button>
        {seeds>0&&<div style={{fontSize:14,color:"rgba(196,30,30,.55)",fontStyle:"italic",alignSelf:"center"}}>Seeds of Destruction: {seeds} — revealed at Chapter VII</div>}
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
        <div style={{marginTop:32}}><button className="btn" onClick={onContinue}>Enter the Decision</button></div>
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
        <div className="gold-div" style={{margin:"20px 0"}} />
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
            const cfg = M_CFG.find(m=>m.key===k);
            const pos = v>0;
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
      <div style={{fontSize:16,color:"rgba(240,232,216,.38)",fontStyle:"italic",marginBottom:40,maxWidth:500,textAlign:"center"}}>
        "The lamps are going out all over Europe. We shall not see them lit again in our lifetime." — Sir Edward Grey, August 3, 1914
      </div>
      <button className="btn btn-red" onClick={onContinue}>Continue to Turning Point Question</button>
    </div>
  );
}

function HingeScreen({ chapter, selected, revealed, onSelect, onContinue }) {
  const correct = chapter.hinge.correct;
  const isRight = selected===correct;
  const getClass = (i)=>{ if(!revealed) return ""; if(i===correct) return "h-correct"; if(i===selected) return "h-sel-wrong"; return "h-wrong"; };
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
        {revealed&&<div style={{marginTop:36}}><button className="btn" onClick={onContinue}>Complete Chapter {chapter.num}</button></div>}
      </div>
    </div>
  );
}

function ChapterEndScreen({ chapter, meters, hingeCorrect, seeds, chIdx, onReturnToHub }) {
  const isFinal = chIdx === CHAPTERS.length - 1;
  const verdict = SEEDS_VERDICT.find(v => seeds <= v.max) || SEEDS_VERDICT[SEEDS_VERDICT.length-1];
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
          <div style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:".2em",textTransform:"uppercase",color:hingeCorrect?"rgba(78,154,94,.75)":"rgba(196,30,30,.7)",marginBottom:8}}>Turning Point Question</div>
          <div style={{fontSize:18,color:"#f0e8d8"}}>{hingeCorrect?"✓ Correct — strong Regents reasoning.":"✗ Review the analysis above — this concept will appear on the exam."}</div>
        </div>
        {!isFinal && seeds>8 && <div className="seeds-warn">⚠ The Seeds of Destruction tracker has reached {seeds}. The full accounting awaits in Chapter VII.</div>}
        {isFinal && (
          <div className="verdict-card" style={{borderColor:`${verdict.color}55`,background:`${verdict.color}0a`}}>
            <div className="verdict-label" style={{color:verdict.color}}>Seeds of Destruction — Final Verdict</div>
            <div className="verdict-title" style={{color:verdict.color}}>{verdict.label}</div>
            <div className="verdict-seeds" style={{color:verdict.color}}>Total Seeds Accumulated: {seeds}</div>
            <div className="verdict-msg">{verdict.msg}</div>
            <div style={{marginTop:20,paddingTop:16,borderTop:`1px solid ${verdict.color}30`,fontSize:14,color:"rgba(240,232,216,.38)",fontStyle:"italic",letterSpacing:".04em"}}>
              This score reflects the cumulative weight of your decisions across all seven chapters — from the arms race of 1910 to the threshold of 1939.
            </div>
          </div>
        )}
        <button className="btn" style={{marginTop:8}} onClick={onReturnToHub}>Return to Chapter Select</button>
      </div>
    </div>
  );
}

export default function App() {
  const saved = loadSave();
  const [screen, setScreen] = useState("title");
  const [name, setName] = useState(saved?.name||"");
  const [period, setPeriod] = useState(saved?.period||"");
  const [completedChapters, setCompletedChapters] = useState(saved?.completed||[]);
  const [chIdx, setChIdx] = useState(0);
  const [decIdx, setDecIdx] = useState(0);
  const [meters, setMeters] = useState({...INIT_METERS});
  const [seeds, setSeeds] = useState(saved?.seeds||0);
  const [selChoice, setSelChoice] = useState(null);
  const [hingeSelected, setHingeSelected] = useState(null);
  const [hingeRevealed, setHingeRevealed] = useState(false);
  const [hingeCorrect, setHingeCorrect] = useState(false);
  const [warType, setWarType] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  const chapter = CHAPTERS[chIdx]||CHAPTERS[0];
  const decision = chapter.decisions[decIdx]||chapter.decisions[0];
  const go = (s)=>{ setAnimKey(k=>k+1); setScreen(s); window.scrollTo(0,0); };
  const saveProgress = (c,s)=>writeSave({name,period,completed:c,seeds:s});

  const applyMeters = (delta)=>{
    setMeters(prev=>{
      const next={...prev};
      for(const [k,v] of Object.entries(delta)) if(k in next) next[k]=Math.max(0,Math.min(100,next[k]+v));
      return next;
    });
    const mil = delta.militarism||0;
    const ally = delta.alliances||0;
    if(mil>0) setSeeds(s=>s+Math.floor(mil/6));
    if(ally<-8) setSeeds(s=>s+1);
  };

  const handleTitleStart=(mode)=>{
    if(mode==="hub"){go("hub");return;}
    if(mode==="new"){clearSave();setName("");setPeriod("");setCompletedChapters([]);setSeeds(0);setScreen("title");setAnimKey(k=>k+1);return;}
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
          {screen==="title"          &&<TitleScreen name={name} setName={setName} period={period} setPeriod={setPeriod} onStart={handleTitleStart} hasSave={!!saved} savedName={saved?.name}/>}
          {screen==="howtoplay"      &&<HowToPlayScreen onContinue={()=>{writeSave({name,period,completed:[],seeds:0});go("hub");}}/>}
          {screen==="hub"            &&<ChapterHub name={name} period={period} completedChapters={completedChapters} seeds={seeds} onSelectChapter={handleSelectChapter} onResetSave={handleResetSave}/>}
          {screen==="chapterIntro"   &&<ChapterIntroScreen chapter={chapter} onContinue={()=>go("chapterContext")}/>}
          {screen==="chapterContext" &&<ContextScreen chapter={chapter} onContinue={()=>{setDecIdx(0);setSelChoice(null);go("decision");}}/>}
          {screen==="decision"       &&<DecisionScreen chapter={chapter} decision={decision} decisionIdx={decIdx} selectedChoice={selChoice} onSelect={setSelChoice} onConfirm={handleConfirm}/>}
          {screen==="consequence"    &&<ConsequenceScreen decision={decision} choiceIdx={selChoice} onContinue={handleConsequenceContinue}/>}
          {screen==="warScreen"      &&<WarDeclaredScreen avoided={warType==="avoided"} onContinue={()=>{setHingeSelected(null);setHingeRevealed(false);go("hinge");}}/>}
          {screen==="hinge"          &&<HingeScreen chapter={chapter} selected={hingeSelected} revealed={hingeRevealed} onSelect={handleHingeSelect} onContinue={handleChapterComplete}/>}
          {screen==="chapterEnd"     &&<ChapterEndScreen chapter={chapter} meters={meters} hingeCorrect={hingeCorrect} seeds={seeds} chIdx={chIdx} onReturnToHub={()=>go("hub")}/>}
        </div>
      </div>
    </>
  );
}
