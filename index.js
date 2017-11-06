const cpuStat   = require('cpu-stat');
const pjson     = require('./package.json');


class CpuCli{

    constructor() {

        let argv = process.argv.slice();
        argv.splice(0, 2);

        switch (argv[0]) {

            case new RegExp('^-(v||version)$', 'i').test(argv[0]) && argv[0]:
                this.version();
                break;

            case new RegExp('^-(h||help)$', 'i').test(argv[0]) && argv[0]:
                this.help();
                break;

            case new RegExp('^-(w||watch)$', 'i').test(argv[0]) && argv[0]:
                this.watch(parseInt(argv[1]) ? parseInt(argv[1]):1);
                break;

            default:
                this.help();

        }

    }

    version(){
        console.log(pjson.name+'@'+pjson.version);
    }

    help(){
        let helpText = `    
Example:
    cpu

Commands:
    [-h] or [-help]

    Example:
         cpu -h
    
    [-v] or [-version]
    
    Example:
        cpu -v 
        
    [-w] or [-watch]
         Examples:
            cpu -w 1
            cpu -w 2`;

        console.log(helpText);
    }

    watch(s){
        let ms = s * 1000;
        setInterval(() => {
            cpuStat.usagePercent(
                {sampleMs: ms,},
                (err, percent, seconds) => {
                    if (err) { return console.error(err); }
                    this.writeToConsole(percent.toFixed(1)+'%');
                }
            );
        }, ms);
    }

    writeToConsole(text) {
        process.stdout.clearLine ? process.stdout.clearLine():'';
        process.stdout.cursorTo ? process.stdout.cursorTo(0):'';
        process.stdout.write(text);
    }

}

new CpuCli();