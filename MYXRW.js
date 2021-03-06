  /* beautify preserve:start */

  "use strict";
  
/* START ASYNC FUNCTIONS
Function from https://github.com/onyxring/Roll20Async, Many thanks Onyx RIng
*/

function setActiveCharacterId(charId){
 var oldAcid=getActiveCharacterId();
 var ev = new CustomEvent("message");
 ev.data={"id":"0", "type":"setActiveCharacter", "data":charId};
 self.dispatchEvent(ev); 
 return oldAcid;
}
/* var _sIn=setInterval;
setInterval=function(callback, timeout){
 var acid=getActiveCharacterId();
 _sIn(
     function(){
         var prevAcid=setActiveCharacterId(acid);
         callback();
         setActiveCharacterId(prevAcid);
     }
 ,timeout);
}
var _sto=setTimeout
setTimeout=function(callback, timeout){
 var acid=getActiveCharacterId();
 _sto(
     function(){
         var prevAcid=setActiveCharacterId(acid);
         callback();
         setActiveCharacterId(prevAcid);
     }
 ,timeout);
} */
function getAttrsAsync(props){
 var acid=getActiveCharacterId(); //save the current activeCharacterID in case it has changed when the promise runs 
 var prevAcid=null;               //local variable defined here, because it needs to be shared across the promise callbacks defined below
 return new Promise((resolve,reject)=>{
         prevAcid=setActiveCharacterId(acid);  //in case the activeCharacterId has changed, restore it to what we were expecting and save the current value to restore later
         try{
             getAttrs(props,(values)=>{  resolve(values); }); 
         }
         catch{ reject(); }
 }).finally(()=>{
     setActiveCharacterId(prevAcid); //restore activeCharcterId to what it was when the promise first ran
 });
}
//use the same pattern for each of the following...
function setAttrsAsync(propObj, options){
 var acid=getActiveCharacterId(); 
 var prevAcid=null;               
 return new Promise((resolve,reject)=>{
         prevAcid=setActiveCharacterId(acid);  
         try{
             setAttrs(propObj,options,(values)=>{ resolve(values); });
         }
         catch{ reject(); }
 }).finally(()=>{
     setActiveCharacterId(prevAcid); 
 });
}

function getSectionIDsAsync(sectionName){
 var acid=getActiveCharacterId(); 
 var prevAcid=null;               
 return new Promise((resolve,reject)=>{
         prevAcid=setActiveCharacterId(acid);  
         try{
             getSectionIDs(sectionName,(values)=>{ resolve(values); });
         }
         catch{ reject(); }
 }).finally(()=>{
     setActiveCharacterId(prevAcid); 
 });
}
function getSingleAttrAsync(prop){ 
 var acid=getActiveCharacterId(); 
 var prevAcid=null;               
 return new Promise((resolve,reject)=>{
         prevAcid=setActiveCharacterId(acid);  
         try{
             getAttrs([prop],(values)=>{  resolve(values[prop]); }); 
         }
         catch{ reject(); }
 }).finally(()=>{
     setActiveCharacterId(prevAcid); 
 });
}
/* END ASYNC FUNCTIONS */


      
  let race_att_names;
  
  /* START RACE TYPE UPDATES */
  
    //object reference for Race specific attribute names
  
    //Upate sheet labels when chartype attribute changes
    on("change:chartype sheet:opened", function(eventInfo) {
        
          var character_types = {
            "Mutant":{  strength: getTranslationByKey("strength"),
                        agility: getTranslationByKey("agility"),
                        wits: getTranslationByKey("wits"),
                        empathy: getTranslationByKey("empathy"),
                        str:getTranslationByKey("strength-abbr"),
                        agi: getTranslationByKey("agility-abbr"),
                        wit: getTranslationByKey("wits-abbr"),
                        emp: getTranslationByKey("empathy-abbr"),
                        damage: getTranslationByKey("damage"),
                        fatigue: getTranslationByKey("fatigue"),
                        confusion: getTranslationByKey("confusion"),
                        doubt: getTranslationByKey("doubt"),
                        endure: getTranslationByKey("endure"),
                        force: getTranslationByKey("force"),
                        fight: getTranslationByKey("fight"),
                        sneak: getTranslationByKey("sneak"),
                        move: getTranslationByKey("move"),
                        shoot: getTranslationByKey("shoot"),
                        scout: getTranslationByKey("scout"),
                        comprehend: getTranslationByKey("comprehend"),
                        know_the_zone: getTranslationByKey("know-the-zone"),
                        sense_emotion: getTranslationByKey("sense-emotion"),
                        manipulate: getTranslationByKey("manipulate"),
                        heal: getTranslationByKey("heal") },
                        
            "Animal":{  strength: getTranslationByKey("strength"),
                        agility: getTranslationByKey("agility"),
                        wits: getTranslationByKey("wits"),
                        empathy: getTranslationByKey("instinct"),
                        str:getTranslationByKey("strength-abbr"),
                        agi: getTranslationByKey("agility-abbr"),
                        wit: getTranslationByKey("wits-abbr"),
                        emp: getTranslationByKey("instinct-abbr"),
                        damage: getTranslationByKey("damage"),
                        fatigue: getTranslationByKey("fatigue"),
                        confusion: getTranslationByKey("confusion"),
                        doubt: getTranslationByKey("doubt"),
                        endure: getTranslationByKey("endure"),
                        force: getTranslationByKey("force"),
                        fight: getTranslationByKey("fight"),
                        sneak: getTranslationByKey("sneak"),
                        move: getTranslationByKey("move"),
                        shoot: getTranslationByKey("shoot"),
                        scout: getTranslationByKey("scout"),
                        comprehend: getTranslationByKey("comprehend"),
                        know_the_zone: getTranslationByKey("know-nature"),
                        sense_emotion: getTranslationByKey("sense-emotion-animal"),
                        manipulate: getTranslationByKey("dominate"),
                        heal: getTranslationByKey("heal") },
              
            "Robot":{   strength: getTranslationByKey("servos"),
                        agility: getTranslationByKey("stability"),
                        wits: getTranslationByKey("processor"),
                        empathy: getTranslationByKey("network"),
                        str: getTranslationByKey("servos-abbr"),
                        agi: getTranslationByKey("stability-abbr"),
                        wit: getTranslationByKey("processor-abbr"),
                        emp: getTranslationByKey("network-abbr"),
                        damage: getTranslationByKey("damage"),
                        fatigue: getTranslationByKey("damage"),
                        confusion: getTranslationByKey("damage"),
                        doubt: getTranslationByKey("damage"),
                        endure: getTranslationByKey("overload"),
                        force: getTranslationByKey("force-robot"),
                        fight: getTranslationByKey("assault"),
                        sneak: getTranslationByKey("infiltrate"),
                        move: getTranslationByKey("move-robot"),
                        shoot: getTranslationByKey("shoot-robot"),
                        scout: getTranslationByKey("scan"),
                        comprehend: getTranslationByKey("datamine"),
                        know_the_zone: getTranslationByKey("analyze"),
                        sense_emotion: getTranslationByKey("question"),
                        manipulate: getTranslationByKey("interact"),
                        heal: getTranslationByKey("repair") },
  
            "Human":{   strength: getTranslationByKey("strength"),
                        agility: getTranslationByKey("agility"),
                        wits: getTranslationByKey("wits"),
                        empathy: getTranslationByKey("empathy"),
                        str: getTranslationByKey("strength-abbr"),
                        agi: getTranslationByKey("agility-abbr"),
                        wit: getTranslationByKey("wits-abbr"),
                        emp: getTranslationByKey("empathy-abbr"),
                        damage: getTranslationByKey("damage"),
                        fatigue: getTranslationByKey("fatigue"),
                        confusion: getTranslationByKey("confusion"),
                        doubt: getTranslationByKey("doubt"),
                        endure: getTranslationByKey("endure"),
                        force: getTranslationByKey("force"),
                        fight: getTranslationByKey("fight"),
                        sneak: getTranslationByKey("sneak"),
                        move: getTranslationByKey("move"),
                        shoot: getTranslationByKey("shoot"),
                        scout: getTranslationByKey("scout"),
                        comprehend: getTranslationByKey("comprehend"),
                        know_the_zone: getTranslationByKey("know-the-zone"),
                        sense_emotion: getTranslationByKey("sense-emotion"),
                        manipulate: getTranslationByKey("manipulate"),
                        heal: getTranslationByKey("heal") },
        };   
        
        getAttrs(["chartype"], function(values) {
                             
          // race_att_names;
            if (_.has(character_types, values.chartype) ) {
              race_att_names = character_types[values.chartype];
            } 
            else {
              race_att_names = character_types["Mutant"];
              setAttrs({chartype: "Mutant"});
            }
            setAttrs({strength_name: race_att_names.strength});
            setAttrs({agility_name: race_att_names.agility});
            setAttrs({wits_name: race_att_names.wits});
            setAttrs({empathy_name: race_att_names.empathy});
            setAttrs({strength_abbr: race_att_names.str});
            setAttrs({agility_abbr: race_att_names.agi});
            setAttrs({wits_abbr: race_att_names.wit});
            setAttrs({empathy_abbr: race_att_names.emp});
            setAttrs({damage_name: race_att_names.damage});
            setAttrs({fatigue_name: race_att_names.fatigue});
            setAttrs({confusion_name: race_att_names.confusion});
            setAttrs({doubt_name: race_att_names.doubt});
            setAttrs({endure_name: race_att_names.endure});
            setAttrs({force_name: race_att_names.force});
            setAttrs({fight_name: race_att_names.fight});
            setAttrs({sneak_name: race_att_names.sneak});
            setAttrs({move_name: race_att_names.move});
            setAttrs({shoot_name: race_att_names.shoot});
            setAttrs({scout_name: race_att_names.scout});
            setAttrs({comprehend_name: race_att_names.comprehend});
            setAttrs({know_the_zone_name: race_att_names.know_the_zone});
            setAttrs({sense_emotion_name: race_att_names.sense_emotion});
            setAttrs({manipulate_name: race_att_names.manipulate});
            setAttrs({heal_name: race_att_names.heal});
        });
    });
  
  /* END RACE TYPE UPDATES */
  
  
  
  /* Attributre damage const */
  const attributes = {
      // an Object Literal: attributes['strength'] returns 'strength_total', attributes['empathy'] returns 'empathy_total', etc
      strength: "strength_total",
      agility: "agility_total",
      wits: "wits_total",
      empathy: "empathy_total",
    };
  
  
  /* Attributre damage const */
  const damages = {
      // an Object Literal: damages['strength'] returns 'damage', damages['empathy'] returns 'doubt', etc
      strength: "damage",
      agility: "fatigue",
      wits: "confusion",
      empathy: "doubt",
    };
  
  /* Skill attributes, misc and gear */
  const skills = {
      // a javascript Object Literal, containing each skill, and its corresponding attribute
      endure: "strength_total",
      force: "strength_total",
      fight: "strength_total",
      sneak: "agility_total",
      Move: "agility_total",
      shoot: "agility_total",
      scout: "wits_total",
      comprehend: "wits_total",
      know_the_zone: "wits_total",
      sense_emotion: "empathy_total",
      manipulate: "empathy_total",
      heal: "empathy_total",
    },
    misc = {
      // a javascript Object Literal, containing each skill, and its corresponding skill modification
      endure: "endure_skill_misc",
      force: "force_skill_misc",
      fight: "fight_skill_misc",
      sneak: "sneak_skill_misc",
      Move: "move_skill_misc",
      shoot: "shoot_skill_misc",
      scout: "scout_skill_misc",
      comprehend: "comprehend_skill_misc",
      know_the_zone: "know_the_zone_skill_misc",
      sense_emotion: "sense_emotion_skill_misc",
      manipulate: "manipulate_skill_misc",
      heal: "heal_skill_misc",
    },
    miscGear = {
      // a javascript Object Literal, containing each skill, and its corresponding gear modification
      endure: "endure_gear_misc",
      force: "force_gear_misc",
      fight: "fight_gear_misc",
      sneak: "sneak_gear_misc",
      Move: "move_gear_misc",
      shoot: "shoot_gear_misc",
      scout: "scout_gear_misc",
      comprehend: "comprehend_gear_misc",
      know_the_zone: "know_the_zone_gear_misc",
      sense_emotion: "sense_emotion_gear_misc",
      manipulate: "manipulate_gear_misc",
      heal: "heal_gear_misc",
    }
  
  /* Monster constant */  
  const monster_skills = {
      "endure monster": "endure_monster",
      "fight monster": "fight_monster",
      "force monster": "force_monster",
    }, 
    monster_misc = {
      "endure monster": "endure_skill_misc_monster",
      "fight monster": "fight_skill_misc_monster",
      "force monster": "force_skill_misc_monster",
    },
    monster_miscGear = {
      "endure monster": "endure_gear_misc_monster",
      "fight monster": "fight_gear_misc_monster",
      "force monster": "force_gear_misc_monster",
    };
  
  /* Switch between tabs. From version 1.12, using buttons.*/
  [`character`, `ark`, `monster`, `zonelog`, 'npc', 'settings'].forEach(attr => {
      on(`clicked:tab_${attr}`, () => {
          setAttrs({tab: attr});
      });
  });
  
  
  /* number and log handling */
  const int = (score, on_error = 0) => parseInt(score) || on_error;
  const float = (score, on_error = 0) => parseFloat(score) || on_error;
  const clog = (text, title = "", color = "green", style = "font-size:12px; font-weight:normal;", headerstyle = "font-size:13px; font-weight:bold;") => {
    let titleStyle = `color:${color}; ${headerstyle} text-decoration:underline;`;
    let textStyle = `color:${color}; ${style}`;
    let output = `%c${title} %c${text}`;
    if (title) {
      console.log(output, titleStyle, textStyle);
    } else {
      output = `%c${text}`;
      console.log(output, textStyle);
    }
  };
  
  /* version tracking */
  
  const newAnnouncement = (old_version, new_version, show_announcement) => {
    const setter = {};
    clog(`Current sheet data version: ${old_version}, Sheet code version: ${new_version}`);
  
    if (new_version > old_version) {
      setter.version = new_version;
    }
    if (show_announcement) {
      clog("New Announcements: v" + new_version);
      setter.show_announcements = 1;
    }
    if (setter) {
      setAttrs(setter, { silent: true });
    }
  };
  
  const versionator = (old_version) => {
    // set the sheet version you are upgrading sheet to, 
    // and set show_announcement to 1 if you want to force an announcement to be shown.
    // don't set a code_version; we use the switch below for that.
    let new_version = 2.0;
    let show_announcement = 1;
    if (!old_version) old_version = 2.0;
    switch (true) {
      //add checks for updates here
      //case old_version === 0:
      //  break;
      /*case old_version < 1.12: // Handled in upgrade to 2.0
        clog("updating to version 1.12");
        update_to_1_12(old_version);
        break;*/
      case old_version < 2.0:
        clog("updating to version 2.0");
        update_to_2_0(old_version);
        break;
      default:
        // if reach this, all codeversion upgrades are complete
        // can run your recalculate function to show announcements
        newAnnouncement(old_version, new_version, show_announcement);
    }
  };

  //add updates here

  /* Upgrade to 2.1 version */

  const update_to_2_1 = async (old_version) => {
    const setter = {};
    const charname = await getAttrsAsync(["character_name"]);
    
    clog(`** UPDATE OF "${charname.character_name}" TO V2.0 FROM ${old_version} DETECTED **`);

   
  }
  
  /* Upgrade to 2.0 version from previous version */
  const update_to_2_0 = async (old_version) => {
  
    const setter = {};
    const charname = await getAttrsAsync(["character_name"]);
    
    clog(`** UPDATE OF "${charname.character_name}" TO V2.0 FROM ${old_version} DETECTED **`);
    
    // On upgrade, set character type to Mutant
    clog(`Upgrade ${charname.character_name}: Setting character type Mutant.`);
    setAttrs({chartype: "Mutant"});
    //const chartypeStr = "Mutant";
    //setter.chartype = chartypeStr;
    
    // On upgrade, turn off modifiers
    clog(`Upgrade ${charname.character_name}: Turning off modifiers.`);
    setAttrs({"adv-modifiers": 0});
    //const modifiersTgl = 0;
    //setter["adv-modifiers"] = modifiersTgl;
    
    // On upgrade, turn on Mutant headers
    clog(`Upgrade ${charname.character_name}: using image header backgrounds.`);
    setAttrs({"header-bgimg": 1});
    //const bgimgTgl = 1;
    //setter["header-bgimg"] = bgimgTgl;  
    
    // Upgrade attributes, no need to update damages
    Object.keys(attributes).forEach((attr) => {
      getAttrs([attr, attributes[attr], damages[attr], attr+"_max", "character_name"], (values) => {
        var attrib = {};
        const charname = values.character_name;
        if (attr == "strength") {
          // Set strength attributes for PC and Monster to attribute_max value
          attrib["strength"] = values["strength_max"];
          attrib["strength_pc"] = values["strength_max"];
          attrib["strength_monster"] = values["strength_max"];
          attrib["strength_total"] = int(attrib["strength"]) - int(damages[attr]);
        } else { 
          // Set other attributes to the attribute_max value 
          attrib[attr] = values[attr+"_max"]; 
          attrib[attr+"_total"] = int(values[attr+"_max"]) - int(damages[attr]);
        }
        const attr_name = getSkillName(attr);
        //attrib[attr_total] = values[attributes[attr]];
        clog(`Upgrade ${attr_name} from ${attr_name}_max ${values[attr+"_max"]} to ${attr_name} ${setter[attr]} with total ${setter[attr+"_total"]}.`);
        setAttrs(attrib);
      });
    });

    // Upgrade rot  
    getAttrs(["rot_permenant"], (values) => {
      const permanent = int(values.rot_permenant);
      clog(`Upgrade ${charname.character_name} permanent rot points ${permanent}`);
      setAttrs({rot_permanent: permanent})
    });
  
    // Mutations
    getSectionIDs("repeating_mutantions", function(mutantions) {
      mutantions.forEach((mutantionsId) => {
        getAttrs(["repeating_mutantions_"+mutantionsId+"_mutantion_name", "repeating_mutantions_"+mutantionsId+"_mutantion_description", "character_name"], (values) => {
          const name = values["repeating_mutantions_"+mutantionsId+"_mutantion_name"],
          description = values["repeating_mutantions_"+mutantionsId+"_mutantion_description"],
          newrowid = generateRowID(),
          charname = values.character_name;
          clog(`Upgrade ${charname}'s mutation ${name}.`);
          let newmutation = {};
          newmutation["repeating_mutations_"+newrowid+"_name"] = name;
          newmutation["repeating_mutations_"+newrowid+"_description"] = description;
          newmutation["repeating_mutations_"+newrowid+"_rank"] = 1;
          newmutation["repeating_mutations_"+newrowid+"_powerlevel"] = 1;
          setAttrs(newmutation);
        });
      });
    });

    // Mutation points
    getAttrs(["mutation", "character_name"], (values) => {
      const mutation = int(values.mutation),
      charname = values.character_name;
      clog(`Upgrade ${charname} mutation points ${mutation}`);
      setAttrs({mutationpoints: mutation});
    });

    // Upgrade Weapons ASYNC
    getSectionIDs("repeating_weapons", function(weapons) {
      weapons.forEach( async (weaponId) => {
        var values = await getAttrsAsync(["repeating_weapons_"+weaponId+"_weapon_name", "repeating_weapons_"+weaponId+"_weapon_skill", "repeating_weapons_"+weaponId+"_weapon_bonus", "repeating_weapons_"+weaponId+"_weapon_damage", "repeating_weapons_"+weaponId+"_weapon_range", "repeating_weapons_"+weaponId+"_weapon_features", "strength_total", "agility_total", "character_name"]);
        //clog(`Upgrade weapon attributes: Weapon ${values["repeating_weapons_"+weaponId+"_weapon_name"]} with ${int(values["repeating_weapons_"+weaponId+"_weapon_skill"])} bonus ${int(values["repeating_weapons_"+weaponId+"_weapon_bonus"])} and damage ${int(values["repeating_weapons_"+weaponId+"_weapon_damage"])} up to ${values["repeating_weapons_"+weaponId+"_weapon_range"]} distance.`);
        const name = values["repeating_weapons_"+weaponId+"_weapon_name"],
        skill = int(values["repeating_weapons_"+weaponId+"_weapon_skill"]),
        bonus = int(values["repeating_weapons_"+weaponId+"_weapon_bonus"]),
        damage = int(values["repeating_weapons_"+weaponId+"_weapon_damage"]),
        range = values["repeating_weapons_"+weaponId+"_weapon_range"], 
        features = values["repeating_weapons_"+weaponId+"_weapon_features"],
        strength = int(values.strength_total),
        agility = int(values.agility_total),
        base = skill === 0 ? strength : agility,
        charname = values.character_name;
        clog(`Upgrade ${charname}'s weapon Weapon ${name} with ${base} base, bonus ${bonus} and damage ${damage} up to ${range} distance.`);
  
        let weapon = {};
        weapon["repeating_weapons_"+weaponId+"_weapon_name"] = name;
        weapon["repeating_weapons_"+weaponId+"_weapon_base_total"] = base;
        weapon["repeating_weapons_"+weaponId+"_weapon_skill"] = skill;
        weapon["repeating_weapons_"+weaponId+"_weapon_skill_misc"] = 0;
        weapon["repeating_weapons_"+weaponId+"_weapon_skill_total"] = skill;
        weapon["repeating_weapons_"+weaponId+"_weapon_bonus"] = bonus;
        weapon["repeating_weapons_"+weaponId+"_weapon_bonus_max"] = bonus;
        weapon["repeating_weapons_"+weaponId+"_weapon_bonus_misc"] = 0;
        weapon["repeating_weapons_"+weaponId+"_weapon_bonus_total"] = bonus;
        weapon["repeating_weapons_"+weaponId+"_weapon_damage"] = damage;
        weapon["repeating_weapons_"+weaponId+"_weapon_damage_misc"] = 0;
        weapon["repeating_weapons_"+weaponId+"_weapon_damage_total"] = damage;
        weapon["repeating_weapons_"+weaponId+"_weapon_grip"] = "1H";
        weapon["repeating_weapons_"+weaponId+"_weapon_range"] = range;
        weapon["repeating_weapons_"+weaponId+"_weapon_carried"] = 1;
        weapon["repeating_weapons_"+weaponId+"_weapon_weight"] = 1;
        weapon["repeating_weapons_"+weaponId+"_weapon_features"] = features;
        await setAttrsAsync(weapon);
      });
    });
  
    /* Upgrade Weapons
    getSectionIDs("repeating_weapons", function(weapons) {
      weapons.forEach((weaponId) => {
        getAttrs(["repeating_weapons_"+weaponId+"_weapon_name", "repeating_weapons_"+weaponId+"_weapon_skill", "repeating_weapons_"+weaponId+"_weapon_bonus", "repeating_weapons_"+weaponId+"_weapon_damage", "repeating_weapons_"+weaponId+"_weapon_range", "repeating_weapons_"+weaponId+"_weapon_features", "strength_total", "agility_total", "character_name"], (values) => {
          //clog(`Upgrade weapon attributes: Weapon ${values["repeating_weapons_"+weaponId+"_weapon_name"]} with ${values["repeating_weapons_"+weaponId+"_weapon_skill"]} bonus ${values["repeating_weapons_"+weaponId+"_weapon_bonus"]} and damage ${values["repeating_weapons_"+weaponId+"_weapon_damage"]} up to ${values["repeating_weapons_"+weaponId+"_weapon_range"]} distance.`);
          const name = values["repeating_weapons_"+weaponId+"_weapon_name"],
          skill = int(values["repeating_weapons_"+weaponId+"_weapon_skill"]),
          bonus = int(values["repeating_weapons_"+weaponId+"_weapon_bonus"]),
          damage = int(values["repeating_weapons_"+weaponId+"_weapon_damage"]),
          range = values["repeating_weapons_"+weaponId+"_weapon_range"], 
          features = values["repeating_weapons_"+weaponId+"_weapon_features"],
          strength = int(values.strength_total),
          agility = int(values.agility_total),
          base = skill === 0 ? strength : agility,
          charname = values.character_name;
          clog(`Upgrade ${charname}'s weapon Weapon ${name} with ${base} base, bonus ${bonus} and damage ${damage} up to ${range} distance.`);
  
          let weapon = {};
          //weapon["repeating_weapons_"+weaponId+"_weapon_name"] = name;
          weapon["repeating_weapons_"+weaponId+"_weapon_base_total"] = base;
          //weapon["repeating_weapons_"+weaponId+"_weapon_skill"] = skill;
          //weapon["repeating_weapons_"+weaponId+"_weapon_skill_misc"] = 0;
          //weapon["repeating_weapons_"+weaponId+"_weapon_skill_total"] = skill;
          //weapon["repeating_weapons_"+weaponId+"_weapon_bonus"] = bonus;
          //weapon["repeating_weapons_"+weaponId+"_weapon_bonus_max"] = bonus;
          //weapon["repeating_weapons_"+weaponId+"_weapon_bonus_misc"] = 0;
          //weapon["repeating_weapons_"+weaponId+"_weapon_bonus_total"] = bonus;
          //weapon["repeating_weapons_"+weaponId+"_weapon_damage"] = damage;
          //weapon["repeating_weapons_"+weaponId+"_weapon_damage_misc"] = 0;
          //weapon["repeating_weapons_"+weaponId+"_weapon_damage_total"] = damage;
          //weapon["repeating_weapons_"+weaponId+"_weapon_grip"] = "1H";
          //weapon["repeating_weapons_"+weaponId+"_weapon_range"] = range;
          //weapon["repeating_weapons_"+weaponId+"_weapon_carried"] = 1;
          //weapon["repeating_weapons_"+weaponId+"_weapon_weight"] = 1;
          //weapon["repeating_weapons_"+weaponId+"_weapon_features"] = features;
          //clog("weapon upgrade : "+JSON.stringify(weapon));
          setAttrs(weapon);
          });
        });
      });*/
  
      // Upgrade armor to repeating section
      getAttrs(["armor1_ar", "armor1_bonus", "armor1_damage", "armor1_equiped", "armor1_name", "armor2_ar", "armor2_bonus", "armor2_damage", "armor2_equiped", "armor2_name", "character_name"], function(values) {
        const charname = values.character_name;
  
        var newarmor1 = {};

        clog(`Upgrade ${charname}'s Armor1 ${values.armor1_name} with bonus ${values.armor1_bonus} and damage ${values.armor1_damage}, equipped ${values.armor1_equiped}`);
        //clog("Upgrade armor1 name: "+(values.armor1_name != null));
        //clog("Upgrade armor1 bonus: "+(values.armor1_bonus != null));
  
        if (values.armor1_name != null && values.armor1_bonus != null) {
            clog("Upgrading Armor1 : " + values.armor1_name + " with bonus : "+ values.armor1_bonus +".");
            const newrowid1 = generateRowID();
            const bonus1_actual = int(values.armor1_bonus) + int(values.armor1_damage);
            const rating1 = bonus1_actual * (values.armor1_equiped == 0 ? 0 : 1);
            clog("Armor rating calculated: "+rating1);
            newarmor1["repeating_armor_" + newrowid1 + "_name"] = values.armor1_name;
            newarmor1["repeating_armor_" + newrowid1 + "_rating"] = rating1;
            newarmor1["repeating_armor_" + newrowid1 + "_carried"] = 1;
            newarmor1["repeating_armor_" + newrowid1 + "_equipped"] = values.armor1_equiped || 1;
            newarmor1["repeating_armor_" + newrowid1 + "_bonus"] = bonus1_actual;
            newarmor1["repeating_armor_" + newrowid1 + "_bonus_misc"] = 0;
            newarmor1["repeating_armor_" + newrowid1 + "_bonus_max"] = int(values.armor1_bonus);
            newarmor1["repeating_armor_" + newrowid1 + "_weight"] = 1;
            newarmor1["repeating_armor_" + newrowid1 + "_features"] = '';
        }
        setAttrs(newarmor1);
  
        var newarmor2 = {};

        clog(`Upgrade ${charname}'s Armor2 ${values.armor2_name} with bonus ${values.armor2_bonus} and damage ${values.armor2_damage}, equipped ${values.armor2_equiped}`);
        //clog("Upgrade armor2 name: "+(values.armor2_name != null));
        //clog("Upgrade armor2 bonus: "+(values.armor2_bonus != null));

        if (values.armor2_bonus != null && values.armor2_name != null) {
            clog("Upgrading Armor2 : " + values.armor2_name + " with bonus : "+ values.armor2_bonus +".");
            const newrowid2 = generateRowID();
            const bonus2_actual = int(values.armor2_bonus) + int(values.armor2_damage);
            const rating2 = bonus2_actual * (values.armor2_equiped == 0 ? 0 : 1);
            clog("Armor rating calculated: "+rating2);
            newarmor2["repeating_armor_" + newrowid2 + "_name"] = values.armor2_name;
            newarmor2["repeating_armor_" + newrowid2 + "_rating"] = rating2;
            newarmor2["repeating_armor_" + newrowid2 + "_carried"] = 1;
            newarmor2["repeating_armor_" + newrowid2 + "_equipped"] = values.armor2_equiped || 1;
            newarmor2["repeating_armor_" + newrowid2 + "_bonus"] = bonus2_actual;
            newarmor2["repeating_armor_" + newrowid2 + "_bonus_misc"] = 0;
            newarmor2["repeating_armor_" + newrowid2 + "_bonus_max"] = int(values.armor2_bonus);
            newarmor2["repeating_armor_" + newrowid2 + "_weight"] = 1;
            newarmor2["repeating_armor_" + newrowid2 + "_features"] = '';
        }
        setAttrs(newarmor2);
  
      });
  
    // Development levels 
    getAttrs(["ark_food_supply","ark_culture", "ark_technology", "ark_warfare", "ark_dev_food", "ark_dev_cult", "ark_dev_tech", "ark_dev_war", "character_name"], (values) => {
      const food = int(values.ark_food_supply),
        culture = int(values.ark_culture),
        tech = int(values.ark_technology),
        war = int(values.ark_warfare),
        charname = values.character_name;
      clog(`Upgrade ${charname}'s ark development levels: food ${food}, culture ${culture}, technology ${tech}, and warfare ${war}.`);
      setAttrs({
          ark_dev_food: food,
          ark_dev_cult: culture,
          ark_dev_tech: tech,
          ark_dev_war: war,
      });
    });
  
    // UPDATE THIS /
    // MUST set the version to a specific value here, the one where the sheet was updated like this.  
    const current_version = 2.0;
    setter.version = current_version;
  
    setAttrs(setter, { silent: true }, versionator(current_version));
  
  };
    
  on("sheet:opened", () => {
    getAttrs(["version"], (v) => {
      versionator(float(v.version));
    });
  });
  
  
  /* ===== PARAMETERS ==========
  GiGs 'Super Simple Summarizer'
  */
  const repeatingSum = (destination, section, fields, multiplier = 1) => {
    if (!Array.isArray(fields)) fields = [fields];
    getSectionIDs(`repeating_${section}`, (idArray) => {
      const attrArray = idArray.reduce((m, id) => [...m, ...fields.map((field) => `repeating_${section}_${id}_${field}`)], []);
      getAttrs(attrArray, (v) => {
        //clog("values of v: " + JSON.stringify(v));
        // getValue: if not a number, returns 1 if it is 'on' (checkbox), otherwise returns 0..
        const getValue = (section, id, field) => float(v[`repeating_${section}_${id}_${field}`]) || (v[`repeating_${section}_${id}_${field}`] === "on" ? 1 : 0);
  
        const sumTotal = idArray.reduce((total, id) => total + fields.reduce((subtotal, field) => subtotal * getValue(section, id, field), 1), 0);
        setAttrs({
          [destination]: sumTotal * multiplier,
        });
      });
    });
  };
  
  /* character encumbrance */
  on("change:repeating_gear remove:repeating_gear sheet:opened", function () {
    clog("Change Detected: Character Gear Encumbrance");
    repeatingSum("gear_encumbrance", "gear", ["gear_weight", "gear_qty", "gear_carried"]);
  });
  
  /* vehicle encumbrance */
  on("change:repeating_vehiclegear remove:repeating_vehiclegear sheet:opened", function () {
    clog("Change Detected: Vehicle Gear Encumbrance");
    repeatingSum("vehiclegear_encumbrance", "vehiclegear", ["vehiclegear_weight", "vehiclegear_qty", "vehiclegear_carried"]);
  });
  
  /* weapons encumbrance */
  on("change:repeating_weapons remove:repeating_weapons sheet:opened", function () {
    clog("Change Detected: Character Weapons Encumbrance");
    repeatingSum("weapons_encumbrance", "weapons", ["weapon_weight", "weapon_carried"]);
  });
  
  /* armor encumbrance */
  on("change:repeating_armor remove:repeating_armor sheet:opened", function () {
    clog("Change Detected: Character Armor Encumbrance");
    repeatingSum("armor_encumbrance", "armor", ["weight", "carried"]);
  });
  
  /* armor rating */
  on("change:repeating_armor remove:repeating_armor sheet:opened", function () {
    clog("Change Detected: Character Armor Rating");
    repeatingSum("ar_total", "armor", ["rating", "equipped"]);
  });

  /* Permanent rot */
  on("change:rot change:rot_permanent sheet:opened", function () {
      clog("Change Detected: Rot levels");
      getAttrs(["rot", "rot_permanent"], (values) => {
        var rot = int(values.rot),
        rot_permanent = int(values.rot_permanent);
        if(rot <= rot_permanent) {
          setAttrs ({ rot: rot_permanent });
        }
      });
    });
  
  /* total encumbrance */
  on("sheet:opened change:gear_encumbrance change:vehiclegear_encumbrance change:weapons_encumbrance change:armor_encumbrance change:food change:water change:bullets", function () {
    getAttrs(["gear_encumbrance", "vehiclegear_encumbrance", "weapons_encumbrance", "armor_encumbrance", "food", "water", "bullets"], function (values) {      
      clog("Change Detected: Character Encumbrance");
  
      const gear_encumbrance = float(values["gear_encumbrance"]),
        vehiclegear_encumbrance = float(values["vehiclegear_encumbrance"]),
        weapons_encumbrance = float(values["weapons_encumbrance"]),
        armor_encumbrance = float(values["armor_encumbrance"]),
        food = float(values["food"]),
        water = float(values["water"]),
        bullets = float(values["bullets"]),
        consumables_enc = (food * 0.25) + (water * 0.25),
        bullets_enc = bullets <= 10 ? 0 : (bullets <= 20 ? 0.5 : (bullets <= 40 ? 1 : 2)),
        consumables_encumbrance = consumables_enc + bullets_enc, 
        sum_character_encumbrance = gear_encumbrance + weapons_encumbrance + armor_encumbrance + consumables_encumbrance,
        sum_vehicle_encumbrance = vehiclegear_encumbrance;
      setAttrs({
        weapons_encumbrance: weapons_encumbrance,
        armor_encumbrance: armor_encumbrance,
        character_encumbrance: sum_character_encumbrance,
        consumables_encumbrance: consumables_encumbrance,
        vehicle_encumbrance: sum_vehicle_encumbrance,
      });
    });
  });
  
  /* total vehicle encumbrance */
  on("sheet:opened change:vehicle_advancedencumbrance change:vehiclegear_encumbrance change:vehicle_occupants change:vehicle_seats change:vehicle_fuel change:vehicle_fuel_cap change:vehicle_maxload", function () { 
   getAttrs(["vehicle_advancedencumbrance", "vehiclegear_total", "vehicle_carry", "vehiclegear_encumbrance", "vehicle_occupants", "vehicle_occupants_weight", "vehicle_seats", "vehicle_fuel", "vehicle_fuel_cap", "vehicle_fuel_weight", "vehicle_maxload", "vehicle_overencumbered"], function (values) {
      clog("Change Detected: Vehicle Encumbrance");
      const adv = int(values["vehicle_advancedencumbrance"]),
        gear = float(values["vehiclegear_encumbrance"]),
        occupants = int(values["vehicle_occupants"]),
        seats = int(values["vehicle_seats"]),
        fuel_cap = int(values["vehicle_fuel_cap"]),
        fuel_in = float(values["vehicle_fuel"]),
        fuel = fuel_in > fuel_cap ? fuel_cap : fuel_in,
        fuel_wght = (adv > 0) ? fuel * 2 : 0, // If Adv, A unit of fuel weighs 2 units
        maxload = int(values["vehicle_maxload"]),
        carry = (adv > 0) ? maxload + (seats * 10) + (fuel_cap * 2) : maxload, // If Adv, Adjusted to accommodate poccupants and fuel
        occupants_wght = (adv > 0) ? occupants * 10 : 0, // If Adv, A person weighs 10 units
        total = gear + fuel_wght + occupants_wght,
        overencumbered = (carry - total) < 0 ? 1 : 0;
      setAttrs({
        vehiclegear_encumbrance: gear,
        vehicle_fuel_weight: fuel_wght,
        vehicle_occupants_weight: occupants_wght,
        vehiclegear_total: total,
        vehicle_carry: carry,
        vehicle_overencumbered: overencumbered,
      });
    });
  });
  
  /* Credits total */
  on("sheet:opened change:credits change:credits_vehicle change:credits_stash", function () {
    getAttrs(["credits", "credits_vehicle", "credits_stash"], function (values) {
      clog("Change Detected: Credits Total");
      const credits = float(values["credits"]),
        credits_vehicle = float(values["credits_vehicle"]),
        credits_stash = float(values["credits_stash"]),
        sum_credits = credits + credits_vehicle + credits_stash;
      setAttrs({
        credits_total: sum_credits,
      });
    });
  });

  //Battle Level
  on("change:ark_dev_war", () => {
    getAttrs(["ark_dev_war"], (values) => {
      clog(JSON.stringify(values));
      clog(`Battle level at ${int(values.ark_dev_war) || 1}`);
      const warfare = Math.ceil(float(values.ark_dev_war) / 10) || 1;
      setAttrs({
        ark_battle_level: warfare,
      });
    });
  });
  
  /* Monster or PC Strength handling. updates attr_strength depending on sheet tab*/
  on("change:tab change:strength_pc change:strength_monster sheet:opened", () => {
    getAttrs(["tab", "strength", "strength_pc", "strength_monster"], (v) => {
      const settings = {},
        tab = (v.tab) ? v.tab : 'character', // sets tab to Character if not recognized - so goes to pc tab;
        str = int(v.strength);
      let pc = int(v.strength_pc),
        monster = int(v.strength_monster),
        forceupdate = 0;
      //clog(`Found updated strength max in tab ${tab}, checking pc = ${pc} and monster = ${monster} strengths, max is now = ${str}.`)
  
      // check if character existed before strength_pc or _monster stats were introduced.
      if (str > 0) {
        if (0 === pc || 0 === monster) forceupdate = 1;
        if (0 === pc) {
          pc = str;
          settings.strength_pc = str;
        }
        if (0 === monster) {
          monster = str;
          settings.strength_monster = str;
        }
      }
      // if tab is not pc or monster, end the function and leave strength unchanged
      if (tab !== 'character' && tab !== 'monster' && !forceupdate) return;
  
      // if tab = 1 or 3, set strength to the appropriate value
      settings.strength = tab === 'monster' ? monster : pc;
  
      setAttrs(settings);
    });
  });
  
  /* ability damage calcs */
  Object.keys(damages).forEach((stat) => {
    // creates a sheet worker for each stat in damages - first stat = 'strength', then stat = 'agility', etc
    // in each worker, stat = the stat (strength, agility, etc) and damages[stat] = the associated damage ('damage'. 'fatigue', etc)
    on(`sheet:opened change:${stat} change:${damages[stat]}`, function () {
      //clog(`${stat} or ${damages[stat]} has changed.`);
      getAttrs([stat, damages[stat]], (values) => {
        const stat_score = int(values[stat]),
          damage_score = int(values[damages[stat]]);
        setAttrs({
          [stat + "_total"]: Math.max(0, stat_score - damage_score),
          //Math.max returns the highest value from a comma separated list - it's just like roll20's kh1 dice function.
          // so you don't need the if( value > 0) test. With math.max, if the value is below 0, it becomes 0.
        });
      });
    });
  });
  
  /*** UPDATE ***/
  /* skill total calcs */
  const getSkill = (label) => (label.split("-").join("_")).split(" ").join("_").toLowerCase(),
    // a function to change (for example) "Know the Zone" to "know_the_zone"
    // needed for a couple of functions below
  
    getSkillKey = (label) => (label.split("_").join("-")).split(" ").join("-").toLowerCase(),
    // a function to change (for example) "Know the Zone" to "know-the-zone"
    // needed for a couple of functions below
  
    getSkillName = (label) => race_att_names[label];
    // A function to get the name of a skill specific for the selected race/character type.
    // Needed for a couple of functions below
  
  Object.keys(skills).forEach((skill_name) => {
    // creates a sheet worker for each skill in skills - first skill = 'strength', then stat = 'agility', etc
    // in each worker, stat = the stat (strength, agility, etc) and damages[stat] = the associated damage ('damage'. 'fatigue', etc)
    const skill = getSkill(skill_name);
    on(`change:${skill} change:${skills[skill_name]} change:${misc[skill_name]} change:${miscGear[skill_name]}`, function () {
      //clog(`${skill} or ${skills[skill_name]} or ${misc[skill_name]} or ${miscGear[skill_name]} has changed.`);
      getAttrs([skill, skills[skill_name], misc[skill_name], miscGear[skill_name]], function (values) {
        const stat_score = int(values[skills[skill_name]]),
          miscSkill_score = int(values[misc[skill_name]]),
          miscGear_score = int(values[miscGear[skill_name]]),
          skillRank_score = int(values[skill]);
        setAttrs({
          [skill + "_total"]: stat_score + skillRank_score + miscSkill_score + miscGear_score,
        });
      });
    });
  });
   
    
  /* set profession skill base and skill total FIX courtesy of GiGs*/
  on('sheet:opened change:repeating_skills:name change:repeating_skills:attribute change:repeating_skills:skill change:repeating_skills:misc change:repeating_skills:gear change:strength_total change:agility_total change:wits_total change:empathy_total', function () {
    //clog('Change Detected: Profession Skill - recalculating Base & Skill totals');
    getSectionIDs('repeating_skills', idarray => {
      const fields = [];
      idarray.forEach(id => fields.push(
        `repeating_skills_${id}_name`,
        `repeating_skills_${id}_attribute`, 
        `repeating_skills_${id}_base`, 
        `repeating_skills_${id}_skill`, 
        `repeating_skills_${id}_misc`, 
        `repeating_skills_${id}_gear`, 
        `repeating_skills_${id}_total`
      ));
      // made the change event specific, so its only fired when needed, and likewise reduced the getAttrs to those only needed
      getAttrs([...fields, 'strength_total', 'agility_total', 'wits_total', 'empathy_total'], function (values) {
        const output = {};
        idarray.forEach(id => {
          const name = values[`repeating_skills_${id}_name`];
          const attr = values[`repeating_skills_${id}_attribute`];
          const skill_skill = int(values[`repeating_skills_${id}_skill`]);
          const skill_misc = int(values[`repeating_skills_${id}_misc`]);
          const skill_gear = int(values[`repeating_skills_${id}_gear`]);
          // separate out the basic values read from the sheet from those calculated within the worker. for clarity
          const skill_base = int(values[`${attr}_total`] || 0);
          const skill_total = skill_base + skill_skill + skill_misc + skill_gear;
          output[`repeating_skills_${id}_base`] = skill_base;
          output[`repeating_skills_${id}_total`] = skill_total;
          //clog('skill_name: ' + name);
          //clog('skill_base: ' + skill_base);
          //clog('skill_total: ' + skill_total);
        });              
      setAttrs(output);
      });
    });
  });
  
  /* set repeating armor rating */
  on("change:repeating_armor:bonus change:repeating_armor:bonus_max change:repeating_armor:bonus_misc change:repeating_armor:equipped", function () {
    clog("Change Detected: Repeating Armor Rating - recalculating rating totals");
    // made the change event specific, so its only fired when needed, and likewise reduced the getAttrs to those only needed
    getAttrs(["repeating_armor_bonus", "repeating_armor_bonus_misc", "repeating_armor_bonus_max", "repeating_armor_rating", "repeating_armor_equipped"], function (values) {
      const bonus = int(values.repeating_armor_bonus),
      bonus_misc = int(values.repeating_armor_bonus_misc),
      bonus_max = int(values.repeating_armor_bonus_max),
      equipped = int(values.repeating_armor_equipped);
      // separate out the basic values read from the sheet from those calculated within the worker
      const bonus_actual = Math.min(bonus, bonus_max);
      const rating = (bonus_actual + bonus_misc) * equipped;
      //clog("armor calculation: ( bonus " + bonus + " + bonus_misc " + bonus_misc + " ) * " + equipped + "  = rating " + rating);
      setAttrs({
        repeating_armor_bonus: bonus_actual,
        repeating_armor_rating: rating,
      });
      //clog("Armor rating: " + rating);
    });
  });
  
  /* set weapon base_total and skill_total */
  on("change:repeating_weapons:weapon_name change:repeating_weapons:weapon_skill change:repeating_weapons:weapon_skill_misc", function () {
    clog("Change Detected: Weapon Attacks - recalculating Base & Skill totals");
    // made the change event specific, so its only fired when needed, and likewise reduced the getAttrs to those only needed
    getAttrs(["repeating_weapons_weapon_skill", "repeating_weapons_weapon_skill_value", "repeating_weapons_weapon_skill_misc", "repeating_weapons_weapon_skill_total", "repeating_weapons_weapon_base_total", "strength_total", "agility_total", "shoot", "fight"], function (values) {
      const strength = int(values.strength_total),
        agility = int(values.agility_total),
        fight = int(values.fight),
        shoot = int(values.shoot),
        weapon_skill = int(values.repeating_weapons_weapon_skill),
        weapon_skill_misc = int(values.repeating_weapons_weapon_skill_misc);
      // separate out the basic values read from the sheet from those calculated within the worker. for clarity
      const attribute = weapon_skill === 0 ? strength : agility,
        skill = weapon_skill === 0 ? fight : shoot,
        weapon_base_total = attribute,
        weapon_skill_value = skill,
        weapon_skill_total = skill + weapon_skill_misc;
      setAttrs({
        repeating_weapons_weapon_base_total: weapon_base_total,
        repeating_weapons_weapon_skill_value: weapon_skill_value,
        repeating_weapons_weapon_skill_total: weapon_skill_total,
      });
      clog(">>>> weapon_base_total: " + weapon_base_total);
      clog(">>>> weapon_skill_value: " + weapon_skill_value);
      clog(">>>> weapon_skill_total: " + weapon_skill_total);
    });
  });
  
  /* set weapon bonus_total and max */  
  on("repeating_weapons:weapon_name change:repeating_weapons:weapon_bonus change:repeating_weapons:weapon_bonus_misc  change:repeating_weapons:weapon_bonus_max", function () {
    clog("Change Detected: Weapon Attacks - recalculating Bonus totals");
    // made the change event specific, so its only fired when needed, and likewise reduced the getAttrs to those only needed
    getAttrs(["repeating_weapons_weapon_bonus", "repeating_weapons_weapon_bonus_misc", "repeating_weapons_weapon_bonus_max"], function (values) {
      const weapon_bonus_misc = int(values.repeating_weapons_weapon_bonus_misc),
        weapon_bonus = int(values.repeating_weapons_weapon_bonus),
        weapon_bonus_max = int(values.repeating_weapons_weapon_bonus_max);
      // separate out the basic values read from the sheet from those calculated within the worker
      //If weapon bonus max is 0, then set it to the value of the weapon bonus
      if (weapon_bonus_max === 0) {
        clog("setting weapon bonus max to value of weapon bonus (since no max detected). New max value = "+weapon_bonus);
        setAttrs({repeating_weapons_weapon_bonus_max: weapon_bonus});
      }
      const weapon_bonus_total = Math.min(weapon_bonus, weapon_bonus_max) + weapon_bonus_misc;
      setAttrs({
        repeating_weapons_weapon_bonus_total: weapon_bonus_total,
      });
      clog(">>>> weapon_bonus_total: " + weapon_bonus_total);
    });
  });
  
  /* set weapon damage totals */
  on("change:repeating_weapons:weapon_damage change:repeating_weapons:weapon_damage_misc", function () {
    clog("Change Detected: Weapon Damage - recalculating totals");
    getAttrs(["repeating_weapons_weapon_damage", "repeating_weapons_weapon_damage_misc"], function (values) {
      const weapon_damage = int(values.repeating_weapons_weapon_damage),
        weapon_damage_misc = int(values.repeating_weapons_weapon_damage_misc),
        damage = Math.max(weapon_damage + weapon_damage_misc, 0);
      setAttrs({
        repeating_weapons_weapon_damage_total: damage,
      });
      clog(">>>> weapon_damage_total: " + damage);
    });
  });
  
  /* re-calculate repeating_weapons when outside attributes change */
  on("change:strength_total change:agility_total change:fight change:shoot", function () {
    getSectionIDs("repeating_weapons", function (ids) {
      const fieldnames = [];
      ids.forEach((id) => {
        fieldnames.push(`repeating_weapons_${id}_weapon_skill`, `repeating_weapons_${id}_weapon_skill_misc`, `repeating_weapons_${id}_weapon_skill_value`, `repeating_weapons_${id}_weapon_bonus`, `repeating_weapons_${id}_weapon_bonus_max`, `repeating_weapons_${id}_weapon_bonus_misc`);
      });
      getAttrs(["strength_total", "agility_total", "fight", "shoot", ...fieldnames], function (values) {
        const settings = {};
        const strength = int(values.strength_total),
          agility = int(values.agility_total),
          fight = int(values.fight),
          shoot = int(values.shoot);
  
        ids.forEach((id) => {
          const weapon_skill = int(values[`repeating_weapons_${id}_weapon_skill`]),
            // calculate attribute total
            attribute = weapon_skill === 0 ? strength : agility,
            weapon_base_total = attribute;
          // calculate skill total
          const weapon_skill_misc = int(values[`repeating_weapons_${id}_weapon_skill_misc`]),
            skill = weapon_skill === 0 ? fight : shoot,
            weapon_skill_total = skill + weapon_skill_misc;
          //calculate bonus total
          const weapon_bonus = int(values[`repeating_weapons_${id}_weapon_bonus`]),
            weapon_bonus_max = int(values[`repeating_weapons_${id}_weapon_bonus_max`]),
            weapon_bonus_misc = int(values[`repeating_weapons_${id}_weapon_bonus_misc`]),
            weapon_bonus_total = Math.min(weapon_bonus, weapon_bonus_max) + weapon_bonus_misc;
          // no need to calculate damage total, its not affected by external factors
          settings[`repeating_weapons_${id}_weapon_base_total`] = weapon_base_total;
          settings[`repeating_weapons_${id}_weapon_skill_value`] = skill;
          settings[`repeating_weapons_${id}_weapon_skill_total`] = weapon_skill_total;
          settings[`repeating_weapons_${id}_weapon_bonus_total`] = weapon_bonus_total;
        });
        setAttrs(settings, { silent: true });
      });
    });
  });

  /* set project completion  */
  on("change:repeating_projects:work_points change:repeating_projects:work_points_max", function () {
      clog("Change Detected: Repeating Project Completion - recalculating completion");
      // made the change event specific, so its only fired when needed, and likewise reduced the getAttrs to those only needed
      getAttrs(["repeating_projects_work_points", "repeating_projects_work_points_max", "repeating_projects_complete"], function (values) {
        var points = int(values.repeating_projects_work_points),
        points_max = int(values.repeating_projects_work_points_max),
        complete = int(values.repeating_projects_complete);
        // separate out the basic values read from the sheet from those calculated within the worker
        points = Math.min(points,points_max),
        complete = (points === points_max) ? 1 : 0;
        const completedStr = (complete === 1) ? "completed" : "not completed";
        clog("project completion: work points " + points + " < required points " + points_max + " => " + completedStr);
        setAttrs({
          repeating_projects_work_points: points,
          repeating_projects_complete: complete,
        });
      });
    });
  
  /* Monster strength-based skill total calcs */
  Object.keys(monster_skills).forEach((skill_name) => {
    const monster_skill = getSkill(skill_name);
    on(`change:${monster_skill} change:${monster_skills[skill_name]} change:${monster_misc[skill_name]} change:${monster_miscGear[skill_name]}`, function () {
      //clog(`${monster_skill} or ${monster_skills[skill_name]} or ${monster_misc[skill_name]} or ${monster_miscGear[skill_name]} has changed.`);
      getAttrs([monster_skill, monster_skills[skill_name], monster_misc[skill_name], monster_miscGear[skill_name]], function (values) {
        const stat_score = int(values[monster_skills[skill_name]]),
          miscSkill_score = int(values[monster_misc[skill_name]]),
          miscGear_score = int(values[monster_miscGear[skill_name]]);
        setAttrs({
          [monster_skill + "_total"]: stat_score + miscSkill_score + miscGear_score,
        });
      });
    });
  });
  
  /* Wes's Dice Pool */
  const pools = {
    attribute: {
      max: 12,
      negative: 0,
    },
    skill: {
      max: 10,
      negative: 3,
    },
    gear: {
      max: 12,
      negative: 0,
    },
  };
  // need to know the max pool size for each type, and whether negative dice should be in the pool.
  const numbers = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
  // need to convert numbers 1-12 to text. left index 0 empty, as its not needed.
  Object.keys(pools).forEach((which) => {
    on(`change:${which}`, function () {
      getAttrs([which], function (values) {
        let score = Math.min(pools[which].max, int(values[which]));
        const settings = {};
        // loop through numbers from 1 to the pool's max, and enter a value of 1 if less < pool value, or 0 otherwise.
        for (let d = 1; d <= pools[which].max; d++) {
          // pools[which].max gets the max value from the pools object.
          settings[`${which}_die_${numbers[d]}`] = d <= score ? 1 : 0;
          // `${which}_die_${numbers[d]}` creates a name like 'gear_die_three'
          //  (d <= score) ? 1 : 0; checks current index and assigns value of 1 if less than equal to pool score
          // settings[attribute] = value stores the appropriate attribute names and values
        }
        // need to check negative dice, and compare score
        // negative dice are set to zero. They are set to 1 only if pool.negative > 0, score is below zero, and absolute value of score is below 1-3.
        for (let n = 1; n <= 3; n++) {
          settings[`negative_die_${numbers[n]}`] = pools[which].negative && score < 0 && n <= Math.abs(score) ? 1 : 0;
  
          // clog("Negative dice are being evaluated. |pools.negative value=" + pools[which].negative + " |Skill score=" + score + " |n=" + n + " |abs of score=" + Math.abs(score) + " |include negative die=" + settings[`negative_die_${numbers[n]}`]);
        }
        setAttrs(settings);
      });
    });
  });
  
  const dicePoolButtons = (which) => {
    clog(`Change Detected: Dice Pool ${which} - button clicked`);
    getAttrs([skills[which], misc[which], miscGear[which], getSkill(which), getSkillKey(which), getSkillName(which)], function (
      values
    ) {
      // skills[which] returns the attribute; e.g skills['sneak'] gives 'agility_total'
      // getSkill(which) converts the skill name to a valid attribute string: getSkill('Know the zone') gives 'know-the-zone'
      // getSkillName(which) uses label, string or key to return character type specific translated skill name: getSkillName('Know the zone') gives 'Know nature' for Animals
      const stat = int(values[skills[which]]),
        miscSkill_score = Math.max(int(values[misc[which]]), -3),
        miscGear_score = int(values[miscGear[which]]),
        // stat here first gets skills['sneak'] which will be, say, 'agility' and
        //  then values['ability_total'] gives you the score from the character sheet.
        skill_attribute_selected = stat > 0 ? stat : 0,
        skill_bonus_misc_selected = miscSkill_score,
        skill_bonus_misc_gear_selected = miscGear_score,
        skill_only_selected = int(values[getSkill(which)]),
        skill = getSkill(which),
        skill_name = getSkillName(skill); // used to get the proper translated character type skill
      clog("Found skill button click, Skill key "+JSON.stringify(which)+" calculated to "+skill+" corresponding to character type "+skill_name);
  
      setAttrs({
        attribute: stat > 0 ? stat : 0, // this is a Ternary Operator, it starts with a question (e.g. is stat > 0)
        // and if true, returns the bit after the ? and if false returns the bit after the :
        // you can often replace simple if/then expressions with a single line ternary operator.
        // uses the translation key
        gear: miscGear_score,
        skill: int(values[getSkill(which)]) + miscSkill_score,
        skill_attribute_selected: skill_attribute_selected,
        skill_bonus_misc_selected: skill_bonus_misc_selected,
        skill_bonus_misc_gear_selected: skill_bonus_misc_gear_selected,
        skill_only_selected: skill_only_selected,
        //skill_notes_selected: skill_notes_selected,
        current_preset: skill_name,
        include_with_roll: `{{skill-base=${skill_attribute_selected}}} {{skill-skill=${skill_only_selected}}} {{skill-bonus-misc-skill=${skill_bonus_misc_selected}}} {{skill-bonus-misc-gear=${skill_bonus_misc_gear_selected}}}}`, // {{skill-notes=${skill_notes_selected}}
      });
    });
  };
  
  Object.keys(skills).forEach((skill) => {
    on(`clicked:dice_pool_${getSkill(skill)}`, () => dicePoolButtons(skill));
  });
  
  /* Monster strength-based skill dice pool */
  const monster_dicePoolButtons = (which) => {
    clog(`Change Detected: Dice Pool ${which} - button clicked`);
    getAttrs([monster_skills[which], monster_misc[which], monster_miscGear[which], getSkill(which), getSkillKey(which)], function (values) {
      const stat = int(values[monster_skills[which]]),
        miscSkill_score = Math.max(int(values[monster_misc[which]]), -3),
        miscGear_score = int(values[monster_miscGear[which]]);
      let whichKey = getTranslationByKey(getSkillKey(which));
      setAttrs({
        attribute: stat > 0 ? stat : 0,
        gear: miscGear_score,
        skill: miscSkill_score,
        current_preset: whichKey,
        include_with_roll: "",
      });
    });
  };
  
  Object.keys(monster_skills).forEach((monster_skill) => {
    on(`clicked:dice_pool_${getSkill(monster_skill)}`, () => monster_dicePoolButtons(monster_skill));
  });
  
  on("sheet:opened clicked:dice_pool_clear", function () {
    clog("Change Detected: Clear Dice Pool - button clicked or sheet loaded");
    setAttrs({
      attribute: 0,
      skill: 0,
      gear: 0,
      attribute_die_twelve: 0,
      attribute_die_eleven: 0,
      attribute_die_ten: 0,
      attribute_die_nine: 0,
      attribute_die_eight: 0,
      attribute_die_seven: 0,
      attribute_die_six: 0,
      attribute_die_five: 0,
      attribute_die_four: 0,
      attribute_die_three: 0,
      attribute_die_two: 0,
      attribute_die_one: 0,
      negative_die_one: 0,
      negative_die_two: 0,
      negative_die_three: 0,
      skill_die_ten: 0,
      skill_die_nine: 0,
      skill_die_eight: 0,
      skill_die_seven: 0,
      skill_die_six: 0,
      skill_die_five: 0,
      skill_die_four: 0,
      skill_die_three: 0,
      skill_die_two: 0,
      skill_die_one: 0,
      gear_die_twelve: 0,
      gear_die_eleven: 0,
      gear_die_ten: 0,
      gear_die_nine: 0,
      gear_die_eight: 0,
      gear_die_seven: 0,
      gear_die_six: 0,
      gear_die_five: 0,
      gear_die_four: 0,
      gear_die_three: 0,
      gear_die_two: 0,
      gear_die_one: 0,
      current_preset: getTranslationByKey(`custom-roll`),
      include_with_roll: "",
    });
  });
  
  /* api dice toggle */
  on("clicked:api_dice_toggle", function () {
    clog("Change Detected: API Dice Toggle - button clicked");
    getAttrs(["api_toggle"], function (values) {
      const api_toggle = int(values.api_toggle);
      let buttonState = api_toggle;
  
      if (buttonState !== 0) {
        buttonState = 0;
      } else {
        buttonState = 1;
      }
      setAttrs({
        api_toggle: buttonState,
      });
    });
  });  
  
  /* set weapon dice pool */
  on("clicked:repeating_weapons:attack-roll", function () {
    clog("Change Detected: Weapon Attack - button clicked");
    getAttrs( ["repeating_weapons_weapon_name", "repeating_weapons_weapon_skill", "repeating_weapons_weapon_base_total", "repeating_weapons_weapon_skill_misc", "repeating_weapons_weapon_skill_total", "repeating_weapons_weapon_bonus", "repeating_weapons_weapon_bonus_max", "repeating_weapons_weapon_bonus_misc", "repeating_weapons_weapon_bonus_total", "repeating_weapons_weapon_damage", "repeating_weapons_weapon_damage_misc", "repeating_weapons_weapon_damage_total", "repeating_weapons_weapon_range", "repeating_weapons_weapon_features", "strength_total", "agility_total", "shoot", "fight", ],
      function (values) {
        const weapon_name = values.repeating_weapons_weapon_name,
          weapon_base_total = int(values.repeating_weapons_weapon_base_total),
          weapon_bonus = int(values.repeating_weapons_weapon_bonus),
          weapon_bonus_misc = int(values.repeating_weapons_weapon_bonus_misc),
          weapon_bonus_max = int(values.repeating_weapons_weapon_bonus_max),
          weapon_bonus_total = int(values.repeating_weapons_weapon_bonus_total),
          weapon_skill_total = int(values.repeating_weapons_weapon_skill_total),
          weapon_damage = int(values.repeating_weapons_weapon_damage),
          weapon_damage_misc = int(values.repeating_weapons_weapon_damage_misc),
          weapon_range = values.repeating_weapons_weapon_range,
          weapon_features = values.repeating_weapons_weapon_features;
        setAttrs({
          attribute: weapon_base_total,
          gear: weapon_bonus_total,
          skill: weapon_skill_total,
          current_preset: getTranslationByKey(`attack`) + ` - ${weapon_name}`,
          include_with_roll: `{{weapon-bonus=${weapon_bonus}}} {{weapon-bonus-max=${weapon_bonus_max}}} {{weapon-bonus-misc=${weapon_bonus_misc}}} {{weapon-damage=${weapon_damage}}} {{weapon-damage-misc=${weapon_damage_misc}}} {{weapon-range=${weapon_range}}} {{weapon-features=${weapon_features}}}`,
        });
      }
    );
  });
  
  /* set weapon parry dice pool */
  on("clicked:repeating_weapons:attack-parry-roll", function () {
    clog("Change Detected: Weapon Parry - button clicked");
    getAttrs( ["repeating_weapons_weapon_name", "repeating_weapons_weapon_skill", "repeating_weapons_weapon_base_total", "repeating_weapons_weapon_skill_misc", "repeating_weapons_weapon_skill_total", "repeating_weapons_weapon_bonus", "repeating_weapons_weapon_bonus_max", "repeating_weapons_weapon_bonus_misc", "repeating_weapons_weapon_bonus_total", "repeating_weapons_weapon_damage", "repeating_weapons_weapon_damage_misc", "repeating_weapons_weapon_damage_total", "repeating_weapons_weapon_range", "repeating_weapons_weapon_features", "strength_total", "agility_total", "shoot", "fight",],
      function (values) {
        const weapon_name = values.repeating_weapons_weapon_name,
          weapon_base_total = int(values.repeating_weapons_weapon_base_total),
          weapon_bonus = int(values.repeating_weapons_weapon_bonus),
          weapon_bonus_max = int(values.repeating_weapons_weapon_bonus_max),
          weapon_bonus_misc = int(values.repeating_weapons_weapon_bonus_misc),
          weapon_bonus_total = int(values.repeating_weapons_weapon_bonus_total),
          weapon_skill_total = int(values.repeating_weapons_weapon_skill_total),
          weapon_damage = int(values.repeating_weapons_weapon_damage),
          weapon_damage_misc = int(values.repeating_weapons_weapon_damage_misc),
          weapon_features = values.repeating_weapons_weapon_features;
        setAttrs({
          attribute: weapon_base_total,
          gear: weapon_bonus_total,
          skill: weapon_skill_total,
          current_preset: getTranslationByKey(`parry`) + ` - ${weapon_name}`,
          include_with_roll: `{{weapon-bonus=${weapon_bonus}}} {{weapon-bonus-max=${weapon_bonus_max}}} {{weapon-bonus-misc=${weapon_bonus_misc}}} {{weapon-damage=${weapon_damage}}} {{weapon-damage-misc=${weapon_damage_misc}}} {{weapon-range=^{arms-length-abbr}}} {{weapon-features=${weapon_features}}}`,
        });
      }
    );
  });
  
  /* Monster attacks dice pool */
  on("clicked:repeating_monster:monster-attack-roll", function () {
    clog("Change Detected: Monster Attack - button clicked");
    getAttrs(["repeating_monster_attack_name", "repeating_monster_attack_dice", "repeating_monster_attack_damage", "repeating_monster_attack_features", "repeating_monster_attack_range", "repeating_monster_attack_description"], function (values) {
      const monster_attack_name = values.repeating_monster_attack_name,
        monster_attack_dice = int(values.repeating_monster_attack_dice),
        monster_attack_damage = int(values.repeating_monster_attack_damage),
        monster_attack_features = values.repeating_monster_attack_features,
        monster_attack_range = values.repeating_monster_attack_range,
        monster_attack_description = values.repeating_monster_attack_description,
        attribute = monster_attack_dice;
      setAttrs({
        attribute: attribute,
        skill: 0,
        gear: 0,
        current_preset: monster_attack_name,
        include_with_roll: `{{weapon-damage=${monster_attack_damage}}} {{attack-features=${monster_attack_features}}} {{weapon-range=${monster_attack_range}}} {{attack-description=${monster_attack_description}}}`,
      });
    });
  });
  
  
  /* set prof skill dice pool */
  on("clicked:repeating_skills", function () {
    clog("Change Detected: Profession Skill - button clicked");
    getAttrs(["repeating_skills_name", "repeating_skills_base", "repeating_skills_skill", "repeating_skills_misc", "repeating_skills_gear"], function (values) {
      const skill_name = values.repeating_skills_name,
        skill_base = int(values.repeating_skills_base),
        skill_level = int(values.repeating_skills_skill),
        skill_misc = int(values.repeating_skills_misc),
        skill_gear = int(values.repeating_skills_gear),
        skill_skill = skill_level + skill_misc;
      setAttrs({
        attribute: skill_base,
        skill: skill_skill,
        gear: skill_gear,
        current_preset: getTranslationByKey(`skill`) + ` - ${skill_name}`,
        include_with_roll: `{{skill-base=${skill_base}}} {{skill-level=${skill_level}}} {{skill-bonus-misc=${skill_misc}}} {{skill-bonus-gear=${skill_gear}}}`,
      });
    });
  });
  
  /* set dice pool for Powers action button - NOT WORKING (buttons are hidden) */
  const powers = ["mutations","modules","animalpowers","contacts"];
  powers.forEach(pow => {
    on(`clicked:repeating_${pow}:powerroll`, (eventInfo) => {
      //clog(JSON.stringify(eventInfo.sourceAttribute));
      var getAttrsString = [`repeating_${pow}_name`,`repeating_${pow}_powerlevel`];
      getAttrs(getAttrsString, function(values) {
        const name = values[`repeating_${pow}_name`],
          level = int(values[`repeating_${pow}_powerlevel`]),
          setAttrObj = {
            attribute: level,
            skill: 0,
            gear: 0,
            current_preset: getTranslationByKey(`power`) + ` - ${name}`,
            include_with_roll: ``,
          };
          //clog(name);
          //clog(level);
          //clog(JSON.stringify(setAttrObj));
        SetAttrs(setAttrObj);/**/
      });
    });
  });
  
  /* set spell dice pool */
  on("clicked:repeating_spells:spell-roll", function () {
    clog("Change Detected: Spell - button clicked");
    getAttrs(["repeating_spells_spell_name", "repeating_spells_spell_rank", "repeating_spells_spell_range", "repeating_spells_spell_duration", "repeating_spells_spell_ingredients", "repeating_spells_spell_description", "repeating_spells_spell_powerpoint", "powerpoint"], function (values) {
      const spell_name = values.repeating_spells_spell_name,
        spell_rank = int(values.repeating_spells_spell_rank),
        spell_powerpoint = int(values.repeating_spells_spell_powerpoint),
        spell_range = values.repeating_spells_spell_range,
        spell_duration = values.repeating_spells_spell_duration,
        spell_ingredients = values.repeating_spells_spell_ingredients,
        spell_description = values.repeating_spells_spell_description,
        powerpoint = int(values.powerpoint);
      setAttrs({
        attribute: spell_powerpoint,
        skill: 0,
        gear: 0,
        current_preset: getTranslationByKey(`spell`) + ` - ${spell_name}`,
        include_with_roll: `{{powerpoint-total=${powerpoint}}} {{spell-rank=${spell_rank}}} {{spell-powerpoint=${spell_powerpoint}}} {{spell-range=${spell_range}}} {{spell-duration=${spell_duration}}} {{spell-ingredients=${spell_ingredients}}} {{spell-description=${spell_description}}}`,
      });
    });
  });
  
  /* set armor dice pool */
  on("clicked:armor-roll", function () {
    clog("Change Detected: Armor - button clicked");
    getAttrs(["ar_total"], function (values) {
        const ar_total = int(values.ar_total);
        setAttrs({
          attribute: 0,
          gear: ar_total,
          skill: 0,
          current_preset: getTranslationByKey(`armor-roll`),
          include_with_roll: `{{armor-rating=[[ ${ar_total} ]]}}`,
        });
      }
    );
  });
  
  /* set rot dice pool */
  on("clicked:rot-roll", function () {
    clog("Change Detected: Rot - button clicked");
    getAttrs(["rot", "rot_permanent"], function (values) {
        const rot = int(values.rot),
          rot_permanent = int(values.rot_permanent);
        setAttrs({
          attribute: rot,
          gear: 0,
          skill: 0,
          current_preset: getTranslationByKey(`rot-roll`),
          include_with_roll: `{{rot-level=[[ ${rot} ]]}} {{rot-permanent=[[ ${rot_permanent} ]]}}`,
        });
      }
    );
  });
  
   
  /* vehicle/Beast Carry calcs */
  const carry = (strength, vehicleed) => (strength * 4) / (vehicleed + 1);
  
  on("change:vehicleed change:vehicle_strength", function () {
    clog("Change Detected: vehicleed/Unvehicleed");
    getAttrs(["vehicleed", "vehicle_strength"], function (values) {
      const vehicleed = int(values["vehicleed"]),
        strength = int(values["vehicle_strength"]),
        Carry = carry(strength, vehicleed);
      setAttrs({
        vehicle_carry: Carry,
      });
    });
  });
  
  on("change:repeating_beasts", function () {
    clog("Change Detected: Beasts Check Carry Calculation");
    getAttrs(["repeating_beasts_beast_vehicleed", "repeating_beasts_beast_strength"], function (values) {
      const vehicleed = int(values["repeating_beasts_beast_vehicleed"]),
        strength = int(values["repeating_beasts_beast_strength"]),
        Carry = carry(strength, vehicleed);
      setAttrs({
        repeating_beasts_beast_carry: Carry,
      });
    });
  });
  
  /* Broken Indicator flags*/
  // first create an array listing all 4 stats
  const stats = ["strength", "strength_monster", "agility", "wits", "empathy"];
  
  /* Update the Dice Pool indicator */
  on(
    "clicked:dice_pool_clear clicked:strength-roll clicked:agility-roll cliecked:wits-roll clicked:empathy-roll clicked:repeating_skills:skill-roll clicked:dice_pool_force_monster clicked:dice_pool_endure_monster clicked:dice_pool_fight_monster clicked:dice_pool_force clicked:dice_pool_endure clicked:dice_pool_fight clicked:dice_pool_sneak clicked:dice_pool_know_the_zone clicked:dice_pool_move clicked:dice_pool_shoot clicked:dice_pool_scout clicked:dice_pool_comprehend clicked:dice_pool_manipulate clicked:dice_pool_sense_emotion clicked:dice_pool_heal clicked:reputation-roll clicked:repeating_weapons:attack-roll clicked:repeating_weapons:attack-parry-roll clicked:repeating_monster:monster-features-roll clicked:repeating_spells:spell-roll clicked:armor-roll",
    function () {
      clog("Change Detected: Update Dice Pool");
      getAttrs(["roll_the_dice_flag"], function (values) {
        const flag = int(values.roll_the_dice_flag);
        setAttrs({
          roll_the_dice_flag: 1 - flag,
        });
      });
    }
  );
  
  on("sheet:opened change:roll_the_dice_flag", function (event) {
    clog("Change Detected: resetting roll_the_dice_flag to zero");
    const flag = int(event.newValue) || 0; // you don't need to include the ,10
    if (flag === 1)
      setAttrs(
        {
          roll_the_dice_flag: 0,
        },
        {
          silent: true,
        }
      );
  });
  
  /* translate query text */
  on("sheet:opened", function () {
    //clog("Translation of query text complete.");
    setAttrs({
      translation_push_query: getTranslationByKey("push-query"),
      translation_whisper_macro_query: "?{" + getTranslationByKey("whisper-macro") + "|" + getTranslationByKey("no") + ",|" + getTranslationByKey("yes") + ",/w gm |" + "}",
      translation_whisper_api_macro_query: "?{" + getTranslationByKey("whisper-macro") + "|" + getTranslationByKey("no") + ",!myz |" + getTranslationByKey("yes") + ",!wmyz |" + "}",
    });
  });
  
  // attribute and skill maximum
  // function which takes an attribute name, its score, and its max, and checks the score is valid.
  // if not, resets its value.
  const checkMax = (stat, score, max) => {
    const settings = {};
    if (score > max) {
      settings[stat] = max;
    } else if (score < 0) {
      settings[stat] = 0;
    }
    return settings;
  };
  stats.forEach((stat) => {
    on(`change:${stat} change:tab`, function () {
      getAttrs([stat, "tab"], function (values) {
        const total = int(values[stat]);
        const tab = values.tab;
        clog("Attribute "+stat+" on tab "+tab+" is "+total);
        clog("(tab === 3 || tab === 'monster') = "+(tab === 3 || tab === 'monster'));
        var max = tab === 3 || tab === 'monster' ? 12 : 6;
        // const max attribute = 12 for monsters; 
        clog("(tab === 3 || tab === 'monster') && stat === strength_monster = "+((tab === 3 || tab === 'monster') && stat === 'strength_monster'));
        max = (tab === 3 || tab === 'monster') && stat === "strength_monster" ? 40 : 12;
        // const max strength = 40 for monsters; 
        const settings = checkMax(stat, total, max);
        if (settings) setAttrs(settings);
      });
    });
  });
  Object.keys(attributes).forEach((stat) => {
    on(`change:${stat}`, function () {
      getAttrs([stat], function (values) {
        const total = int(values[stat]);
        clog("")
        const max = pools.attribute.max;
        const settings = checkMax(stat, total, max);
        if (settings) setAttrs(settings);
      });
    });
  });
  
  /* Update attributes total max */
  on("sheet:opened change:strength_total", function () {
    clog("Change Detected: strength_total has changed");
    getAttrs(["strength", "strength_total"], function (values) {
      const strength = int(values.strength),
        strength_total = int(values.strength_total);
        clog("Change Detected: strength_total has changed: "+strength_total);
      setAttrs({
        strength: strength,
        strength_total: strength_total,
      });
    });
  });
  
  on("sheet:opened change:agility_total", function () {
    clog("Change Detected: agility_total has changed");
    getAttrs(["agility", "agility_total"], function (values) {
      const agility = int(values.agility),
        agility_total = int(values.agility_total);
        clog("Change Detected: agility_total has changed: "+agility_total);
      setAttrs({
        agility: agility,
        agility_total: agility_total,
      });
    });
  });
  
  on("sheet:opened change:wits_total", function () {
    clog("Change Detected: wits_total has changed");
    getAttrs(["wits", "wits_total"], function (values) {
      const wits = int(values.wits),
        wits_total = int(values.wits_total);
        clog("Change Detected: wits_total has changed: "+wits_total);
      setAttrs({
        wits: wits,
        wits_total: wits_total,
      });
    });
  });
  
  on("sheet:opened change:empathy_total", function () {
    clog("Change Detected: empathy_total has changed");
    getAttrs(["empathy", "empathy_total"], function (values) {
      const empathy = int(values.empathy),
        empathy_total = int(values.empathy_total);
      clog("Change Detected: empathy_total has changed: "+empathy_total);
      setAttrs({
        empathy: empathy,
        empathy_total: empathy_total,
      });
    });
  });
  
  /* set strength dice pool */
  on("clicked:strength-roll", function () {
    clog("Change Detected: Strength - button clicked");
    getAttrs(["strength_total"], function (values) {
      const strength_total = int(values.strength_total) > 12 ? 12 : int(values.strength_total),
      strength_name = getSkillName("strength");
      
      //clog(strength_name + " : " + strength);
      setAttrs({
        attribute: strength_total,
        skill: 0,
        gear: 0,
        current_preset: strength_name,
        include_with_roll: "",
      });
    });
  });
  
  /* set agility dice pool */
  on("clicked:agility-roll", function () {
    clog("Change Detected: agility - button clicked");
    getAttrs(["agility_total"], function (values) {
      const agility_total = int(values.agility_total),
      agility_name = getSkillName("agility");
      //clog(agility_name + " : " + agility_total);
      setAttrs({
        attribute: agility_total,
        skill: 0,
        gear: 0,
        current_preset: agility_name,
        include_with_roll: "",
      });
    });
  });
  
  /* set wits dice pool */
  on("clicked:wits-roll", function () {
    clog("Change Detected: wits - button clicked");
    getAttrs(["wits_total"], function (values) {
      const wits_total = int(values.wits_total),
      wits_name = getSkillName("wits");
      //clog(wits_name + " : " + wits_total);
      setAttrs({
        attribute: wits_total,
        skill: 0,
        gear: 0,
        current_preset: wits_name,
        include_with_roll: "",
      });
    });
  });
  
  /* set empathy dice pool */
  on("clicked:empathy-roll", function () {
    clog("Change Detected: empathy - button clicked");
    getAttrs(["empathy_total"], function (values) {
      const empathy_total = int(values.empathy_total),
      empathy_name = getSkillName("empathy");
      //clog(empathy_name + " : " + empathy_total);
      setAttrs({
        attribute: empathy_total,
        skill: 0,
        gear: 0,
        current_preset: empathy_name,
        include_with_roll: "",
      });
    });
  });
  
  /* delete empty repeating rows w/out having to close/reopen sheet*/
  on('remove:repeating_injuries remove:repeating_weapons remove:repeating_skills remove:repeating_gear remove:repeating_vehiclegear remove:repeating_relationships remove:repeating_spells remove:repeating_beasts remove:repeating_notes remove:repeating_ark-notes remove:repeating_log remove:repeating_monster remove:repeating_mutations remove:repeating_armor remove:repeating_biomechs remove:repeating_contacts remove:repeating_animalpowers remove:repeating_modules remove:repeating_talents', function() { 
    const timestamp = Number(new Date())
    setAttrs({ repeat_delete: timestamp });
    clog("repeating row has been removed");
  });
  
  /* beautify preserve:end */