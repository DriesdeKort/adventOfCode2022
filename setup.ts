import * as fs from 'fs';
//create a folder for every day from day1 to day30
//add files to each folder: day1.ts, input.txt, test.txt, instruction.txt

function createFolders() {
    for (let i = 1; i <= 30; i++) {
        const folderName = `day${i}`;
        const folderPath = `./${folderName}`;
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }   
    }
}
createFolders();

function createFiles() {
    for (let i = 1; i <= 30; i++) {
        const folderName = `day${i}`;
        const folderPath = `./${folderName}`;
        const files = ['input.txt', 'test.txt', 'instruction.txt'];
        files.forEach(file => {
            const filePath = `${folderPath}/${file}`;
            if (!fs.existsSync(filePath)) {
                //create file
                fs.writeFileSync(filePath, '');
            }
        });

    }
}
createFiles();



