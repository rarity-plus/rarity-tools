const ethers = require("ethers")
var fs = require('fs');
const {SKILLS_CODEX_ABI} = require('./ABI')

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.ftm.tools/");

    const skillsCodexContract = new ethers.Contract("0x67ae39a2Ee91D7258a86CD901B17527e19E493B3", SKILLS_CODEX_ABI, provider)

    let skills = {}

    console.log("Fetching Skills Codex...")

    for(let i = 1; i <= 36; i++){
        let skill = await skillsCodexContract.skill_by_id(i)
        
        skills[Number(i)] = {
            "id": skill['id'].toString(),
            "name": skill['name'],
            "attributeId": skill['attribute_id'].toString(),
            "synergy": skill['synergy'].toString(),
            "retry:": skill['retry'] ,
            "armorCheckPenalty": skill['armor_check_penalty'],
            "check": skill['check'],
            "action": skill['action']
        }
    }

    console.log("Saving data...")

    fs.writeFile("./data/skills_codex.json", JSON.stringify(skills), function(err) {
        if (err) {
            console.error(err);
        }else{
            console.log("Data saved!")
        }
    });
}

main();