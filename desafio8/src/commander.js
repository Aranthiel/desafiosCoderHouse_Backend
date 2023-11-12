import {program}from 'commander':

program
    .option('-m, --morde <mode>', 'amniente a ejecutar', 'dev')
    .option('-p, --port <port>', 'puerto', 8080)
    .option('-d, --debug','variable para modo debug', false)
    .parse();

console.log('options', program.opts()); // imprime solo los argumentos que fueron definidas como opcion
console.log('others', program.args);//imprime todos los argumentos que se pasaron aunque no esten configurados como opction

