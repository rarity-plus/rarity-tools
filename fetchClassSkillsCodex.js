const ethers = require("ethers")
var fs = require('fs');
const {SKILLS_CODEX_ABI, CLASS_SKILLS_CODEX_ABI} = require('./ABI')

async function fetchClassSkillsCodex() {

    const provider = new ethers.providers.JsonRpcProvider("https://rpc.ftm.tools/");
    const classSkillsCodexContract = new ethers.Contract("0xf677eD67B7717f3a743BE8D9b6662B11b095DB43", CLASS_SKILLS_CODEX_ABI, provider)

    let classSkills = {}

    for(let i = 1; i <= 11; i++){
        let rawClassSkills = await classSkillsCodexContract.class_skills(i)
        
        let classSkill = []

        for(let y = 1; y <= 36; y++){
            if(rawClassSkills[y]){
                classSkill.push(y+1)
            }
        }

        classSkills[i] = classSkill
        
    }

    fs.writeFile("./data/class_skills.json", JSON.stringify(classSkills), function(err) {
        if (err) {
            console.error(err);
        }else{
            console.log("Data saved!")
        }
    });

    return classSkills
}

fetchClassSkillsCodex()

// main();