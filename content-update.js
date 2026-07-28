/* Eden Island Explorer content pack v2.
   Loaded after index.html so it can extend the existing quest and badge data
   without changing saved progress or cloud sync. */

(() => {
  const retiredQuestIds = new Set([
    "hf12", // Build a Tiny Shelter
    "hf13", // Treasure Sketch
    "hf15", // Home Flag
    "qh6",  // Island Comic
    "qh11", // Island Menu
    "qh12", // Secret Code
    "qh15"  // Draw the Best House
  ]);

  // Do not delete retired quests from history. They simply stop appearing again.
  quests.forEach(q => {
    if (retiredQuestIds.has(q.id)) q.retired = true;
  });

  const newQuests = [
    // MAPS AND NAVIGATION
    {id:"map01",title:"Pokémon Region Map",text:"Place six Pokémon cards on paper as towns or landmarks. Draw roads between them and name the region.",zones:["quiet_home"],support:0,time:"20 min",xp:20,cat:"navigator",cooldownDays:10},
    {id:"map02",title:"Treasure Route",text:"Draw a map from the front door to a pretend treasure inside the allowed zone. Add three landmarks and a compass arrow.",zones:["home_front","quiet_home"],support:0,time:"20 min",xp:20,cat:"navigator",cooldownDays:10},
    {id:"map03",title:"Memory Map: Park",text:"Draw the park and nearby beach from memory before visiting. After the trip, add what you missed.",zones:["quiet_home","park_beach"],support:2,time:"25 min",xp:25,cat:"navigator",cooldownDays:14},
    {id:"map04",title:"Animal Sighting Map",text:"Make a simple map and mark where you have seen a bird, gecko, fish, crab or insect.",zones:["home_front","home_visible","quiet_home","park_beach"],support:0,time:"20 min",xp:20,cat:"navigator",cooldownDays:10},
    {id:"map05",title:"Buggy Route Planner",text:"Choose a safe buggy destination with an adult and draw the route with a start, finish and three turns.",zones:["quiet_home","park_beach"],support:2,time:"15 min",xp:20,cat:"navigator",cooldownDays:10},
    {id:"map06",title:"Map Symbols Challenge",text:"Invent six map symbols for pool, beach, park, home, bridge and favourite place. Add a legend.",zones:["quiet_home"],support:0,time:"20 min",xp:20,cat:"navigator",cooldownDays:14},
    {id:"map07",title:"Maze Map",text:"Draw a maze with one entrance, one exit, two dead ends and a hidden Pokémon card location.",zones:["quiet_home"],support:0,time:"20 min",xp:20,cat:"navigator",cooldownDays:10},
    {id:"map08",title:"Friend's Treasure Map",text:"Hide one safe object near the house, draw a map and let a friend or adult find it.",zones:["home_front","quiet_home"],support:1,time:"20 min",xp:20,cat:"navigator",cooldownDays:14},
    {id:"map09",title:"Pool Mission Map",text:"On paper, draw the pool and mark three supervised stations for a ring, noodle and dive toy.",zones:["home_pool","quiet_home"],support:3,time:"15 min",xp:20,cat:"navigator",cooldownDays:10},
    {id:"map10",title:"Then and Now Map",text:"Draw the route you took today. Use one colour for the planned route and another for the real route.",zones:["quiet_home","park_beach"],support:0,time:"15 min",xp:20,cat:"navigator",cooldownDays:7},
    {id:"map11",title:"Landmark Ranking Map",text:"Draw four nearby landmarks and rank them from easiest to hardest to find.",zones:["home_front","quiet_home"],support:0,time:"15 min",xp:15,cat:"navigator",cooldownDays:10},
    {id:"map12",title:"Rescue Map",text:"Draw a safe rescue route for a lost toy from one place to another. Explain every step to an adult.",zones:["quiet_home","home_front"],support:1,time:"20 min",xp:20,cat:"navigator",cooldownDays:14},

    // POKÉMON CARDS
    {id:"pk01",title:"Pokémon Type Teams",text:"Choose three Pokémon types from your cards. Build one small team for each type and explain the choices.",zones:["quiet_home"],support:0,time:"20 min",xp:20,cat:"pokemon",cooldownDays:7},
    {id:"pk02",title:"Highest HP Line-Up",text:"Find your ten highest-HP cards and arrange them from lowest to highest HP.",zones:["quiet_home"],support:0,time:"15 min",xp:15,cat:"pokemon",cooldownDays:10},
    {id:"pk03",title:"Pokémon Alphabet Hunt",text:"Find Pokémon whose names begin with five different letters. Put them in alphabetical order.",zones:["quiet_home"],support:0,time:"15 min",xp:15,cat:"pokemon",cooldownDays:7},
    {id:"pk04",title:"Dream Team of Six",text:"Choose six cards for your dream team. Give each Pokémon a role such as leader, defender, fast one or funny one.",zones:["quiet_home"],support:0,time:"20 min",xp:20,cat:"pokemon",cooldownDays:10},
    {id:"pk05",title:"Pokémon Island Habitats",text:"Sort twelve cards into beach, jungle, sky and city habitats. Explain one difficult choice.",zones:["quiet_home"],support:0,time:"20 min",xp:20,cat:"pokemon",cooldownDays:10},
    {id:"pk06",title:"Weakest to Strongest",text:"Choose eight cards and order them using one rule: HP, attack damage or your own strength score.",zones:["quiet_home"],support:0,time:"15 min",xp:15,cat:"pokemon",cooldownDays:7},
    {id:"pk07",title:"Mystery Pokémon",text:"Choose one card secretly. Give five clues without saying its name and let an adult guess.",zones:["quiet_home"],support:1,time:"15 min",xp:15,cat:"pokemon",cooldownDays:5},
    {id:"pk08",title:"Pokémon Card Draft",text:"Choose twelve cards, split them into three groups of four, then pick one card from each group for a mini team.",zones:["quiet_home"],support:0,time:"20 min",xp:20,cat:"pokemon",cooldownDays:10},
    {id:"pk09",title:"Energy Match",text:"Find five Pokémon cards and match each one with the energy type you think fits best. Check the card symbols.",zones:["quiet_home"],support:0,time:"15 min",xp:15,cat:"pokemon",cooldownDays:7},
    {id:"pk10",title:"Pokémon Number Detective",text:"Find five different numbers on Pokémon cards. Add them, compare them or arrange them from smallest to largest.",zones:["quiet_home"],support:0,time:"15 min",xp:15,cat:"pokemon",cooldownDays:7},
    {id:"pk11",title:"Best Card Art Awards",text:"Choose winners for funniest art, coolest background, best colours and most surprising card.",zones:["quiet_home"],support:0,time:"15 min",xp:15,cat:"pokemon",cooldownDays:10},
    {id:"pk12",title:"Pokémon Story Chain",text:"Draw three random cards. Tell a short story that includes all three Pokémon in order.",zones:["quiet_home"],support:0,time:"15 min",xp:15,cat:"pokemon",cooldownDays:5},
    {id:"pk13",title:"Pokémon Memory Grid",text:"Study nine cards for one minute. Turn them face down and name as many as you can.",zones:["quiet_home"],support:1,time:"15 min",xp:20,cat:"pokemon",cooldownDays:7},
    {id:"pk14",title:"Pokémon Tournament Bracket",text:"Choose eight cards, draw a tournament bracket and decide each winner using one clear rule.",zones:["quiet_home"],support:0,time:"25 min",xp:25,cat:"pokemon",cooldownDays:14},
    {id:"pk15",title:"Same and Different",text:"Choose two Pokémon cards. Find three things that are the same and three things that are different.",zones:["quiet_home"],support:0,time:"12 min",xp:15,cat:"pokemon",cooldownDays:5},
    {id:"pk16",title:"Pokémon Shop",text:"Choose six cards and give each a pretend price from 1 to 20 coins. Build a team that costs exactly 50 coins.",zones:["quiet_home"],support:0,time:"20 min",xp:20,cat:"pokemon",cooldownDays:10},
    {id:"pk17",title:"Water Pokémon Pool Team",text:"Choose Pokémon cards that could join a pool rescue team. Give each one a job.",zones:["quiet_home","home_pool"],support:0,time:"15 min",xp:15,cat:"pokemon",cooldownDays:10},
    {id:"pk18",title:"Pokémon Card Categories",text:"Create your own four category names and sort at least sixteen cards into them.",zones:["quiet_home"],support:0,time:"20 min",xp:20,cat:"pokemon",cooldownDays:10},

    // DETECTIVE AND OBSERVATION
    {id:"det01",title:"Perfect Circle Hunt",text:"Find five circles or nearly circular shapes around the house. Rank the best three.",zones:["home_front","home_visible"],support:0,time:"12 min",xp:15,cat:"detective",cooldownDays:7},
    {id:"det02",title:"Hidden Letters",text:"Find outdoor objects or shapes that look like five different letters.",zones:["home_front","home_visible","park_beach"],support:0,time:"15 min",xp:15,cat:"detective",cooldownDays:7},
    {id:"det03",title:"Reflection Detective",text:"Find three safe reflections in water, windows or shiny objects. Describe what changes in each reflection.",zones:["home_visible","park_beach"],support:1,time:"15 min",xp:15,cat:"detective",cooldownDays:7},
    {id:"det04",title:"One Colour, Ten Things",text:"Choose one colour and find ten different things that include it.",zones:["home_front","home_visible","park_beach"],support:0,time:"12 min",xp:15,cat:"detective",cooldownDays:5},
    {id:"det05",title:"Tiny to Huge",text:"Find five safe objects and arrange them from tiniest to biggest without moving heavy things.",zones:["home_front","home_visible"],support:0,time:"12 min",xp:15,cat:"detective",cooldownDays:7},
    {id:"det06",title:"Symmetry Search",text:"Find four things that are symmetrical and one thing that is almost symmetrical.",zones:["home_front","home_visible","park_beach"],support:0,time:"15 min",xp:15,cat:"detective",cooldownDays:7},
    {id:"det07",title:"What Changed?",text:"Study a small area for one minute. Turn around while an adult moves one safe item, then identify the change.",zones:["quiet_home","home_front"],support:1,time:"12 min",xp:15,cat:"detective",cooldownDays:5},
    {id:"det08",title:"Sound Direction",text:"Close your eyes in a safe place. Identify four sounds and point to where each came from.",zones:["home_front","home_visible","park_beach"],support:1,time:"10 min",xp:15,cat:"detective",cooldownDays:7},
    {id:"det09",title:"Number Hunt",text:"Find the numbers 1 to 10 on signs, cards, books or objects. They do not need to be in order.",zones:["quiet_home","home_front","park_beach"],support:0,time:"15 min",xp:15,cat:"detective",cooldownDays:7},
    {id:"det10",title:"Three Clue Location",text:"Choose a nearby safe place and give an adult three clues so they can guess it.",zones:["home_front","quiet_home"],support:1,time:"12 min",xp:15,cat:"detective",cooldownDays:5},

    // POOL VARIETY
    {id:"pool11",title:"Dive Toy Sequence",text:"With an adult watching, collect dive toys in a colour or size sequence chosen before entering the water.",zones:["home_pool","public_pool"],support:3,time:"15 min",xp:20,cat:"pool",cooldownDays:5},
    {id:"pool12",title:"Noodle Taxi",text:"Use one foam noodle to safely transport a floating toy between two supervised stations.",zones:["home_pool"],support:3,time:"15 min",xp:20,cat:"pool",cooldownDays:5},
    {id:"pool13",title:"Ring Delivery Route",text:"Move both rings to three different pool stations without throwing them. An adult chooses the route.",zones:["home_pool"],support:3,time:"15 min",xp:20,cat:"pool",cooldownDays:7},
    {id:"pool14",title:"Underwater Colour Hunt",text:"An adult places dive toys. Collect one requested colour at a time. No breath-holding contest.",zones:["home_pool","public_pool"],support:3,time:"15 min",xp:20,cat:"pool",cooldownDays:5},
    {id:"pool15",title:"Pool Memory Route",text:"An adult shows a safe route around three floating objects. Repeat it from memory.",zones:["home_pool"],support:3,time:"15 min",xp:20,cat:"pool",cooldownDays:7},
    {id:"pool16",title:"Team Rescue Roles",text:"With a friend, choose a captain and rescuer. Swap roles after rescuing three floating toys.",zones:["home_pool","public_pool"],support:3,time:"20 min",xp:25,cat:"team",friend:true,cooldownDays:7},
    {id:"pool17",title:"Pokémon Water Gym",text:"Choose three Pokémon cards as gym leaders. Complete one safe supervised pool challenge for each card.",zones:["home_pool"],support:3,time:"20 min",xp:25,cat:"pokemon",cooldownDays:10},
    {id:"pool18",title:"Slow Motion Swim",text:"With an adult watching, cross a short safe route as slowly and smoothly as possible three times.",zones:["home_pool","public_pool"],support:3,time:"15 min",xp:20,cat:"pool",cooldownDays:7},

    // PARK, BEACH AND FRIENDS
    {id:"park13",title:"No Children Plan B",text:"If no children are at the park, choose one: sand maze, beach map or detective hunt. Complete it with a short adult start.",zones:["park_beach"],support:2,time:"25 min",xp:20,cat:"explorer",cooldownDays:5},
    {id:"park14",title:"Teach a Simple Game",text:"Invite another child to learn one simple game that takes less than two minutes to explain.",zones:["park_beach"],support:3,time:"20 min",xp:25,cat:"social",cooldownDays:7},
    {id:"park15",title:"Beach Pokémon Trail",text:"Draw five Pokémon footprints or symbols in the sand and create a trail for a friend or adult to follow.",zones:["park_beach"],support:2,time:"20 min",xp:20,cat:"pokemon",cooldownDays:10},
    {id:"park16",title:"Sand Maze Race",text:"Draw a large maze in the sand. Test it with a small toy, stone or finger and improve one dead end.",zones:["park_beach"],support:2,time:"25 min",xp:20,cat:"navigator",cooldownDays:10},
    {id:"park17",title:"Three New Names",text:"Across different park visits, learn three children's names. One new name counts as progress today.",zones:["park_beach"],support:3,time:"20 min",xp:20,cat:"social",cooldownDays:5},
    {id:"park18",title:"Friend Choice Challenge",text:"Let a friend choose between a map, pool or sand mission, then complete the chosen activity together.",zones:["park_beach","home_pool","quiet_home"],support:2,time:"25 min",xp:25,cat:"team",friend:true,cooldownDays:7},

    // QUICK QUIET OPTIONS
    {id:"quick01",title:"Five-Card Speed Sort",text:"Choose twenty Pokémon cards and sort them into four groups as quickly and accurately as possible.",zones:["quiet_home"],support:0,time:"10 min",xp:15,cat:"pokemon",cooldownDays:5},
    {id:"quick02",title:"Map Puzzle for an Adult",text:"Draw a tiny map with three clues and ask an adult to identify the place.",zones:["quiet_home"],support:0,time:"12 min",xp:15,cat:"navigator",cooldownDays:5},
    {id:"quick03",title:"Pokémon Odd One Out",text:"Make four groups of four cards. In each group, choose the odd one out and explain why.",zones:["quiet_home"],support:0,time:"12 min",xp:15,cat:"pokemon",cooldownDays:5},
    {id:"quick04",title:"Card Number Race",text:"Find five Pokémon cards whose HP adds to the biggest total you can make in two minutes.",zones:["quiet_home"],support:0,time:"10 min",xp:15,cat:"pokemon",cooldownDays:5}
  ];

  const existingIds = new Set(quests.map(q => q.id));
  newQuests.forEach(q => {
    if (!existingIds.has(q.id)) quests.push(q);
  });

  // Pokémon becomes a real multi-quest badge instead of relying on one rare-card task.
  badgeCategoryMap.pokemon = "pokemon_master";
  const pokemonBadge = badges.find(b => b.id === "pokemon_master");
  if (pokemonBadge) {
    pokemonBadge.name = "Pokémon Collector";
    pokemonBadge.need = 5;
    pokemonBadge.description = "Complete 5 different Pokémon card missions.";
    pokemonBadge.icon = "⚡";
  }

  const mapBadge = badges.find(b => b.id === "navigator");
  if (mapBadge) {
    mapBadge.name = "Cartographer";
    mapBadge.need = 5;
    mapBadge.description = "Complete 5 map or navigation missions.";
  }

  // Older creative quests can still appear in history, but no longer contribute
  // fresh random options once retired.
  const previousEligible = eligibleQuestsForCurrentSettings;
  eligibleQuestsForCurrentSettings = function() {
    const base = previousEligible();
    const active = activeDate();
    const activeTime = new Date(`${active}T12:00:00`).getTime();

    return base.filter(q => {
      if (q.retired) return false;

      const lastCompletion = state.completed
        .filter(c => c.id === q.id)
        .map(c => new Date(`${c.date}T12:00:00`).getTime())
        .filter(Number.isFinite)
        .sort((a, b) => b - a)[0];

      if (!lastCompletion) return true;
      const cooldownDays = q.cooldownDays || 7;
      const elapsedDays = Math.floor((activeTime - lastCompletion) / 86400000);
      return elapsedDays >= cooldownDays;
    });
  };

  // Show the refreshed names and badge counts immediately.
  renderAll();
})();
