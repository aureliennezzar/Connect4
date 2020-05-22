$(document).ready(function () {
    console.log("Connect 4 is ready to rock !")
    setInterval(checkAnimatedToken, 1)
});
let game = true;
let color = "red";
const heights = [563, 563, 563, 563, 563, 563, 563];
const columns = ['', '', '', '', '', '', ''];
let combiGagnante = [];
const tableau =

    ['-------',
        '-------',
        '-------',
        '-------',
        '-------',
        '-------'];
const restartGame = () => {

    heights = [563, 563, 563, 563, 563, 563, 563];
    columns = ['', '', '', '', '', '', ''];
    tableau =
        ['-------',
            '-------',
            '-------',
            '-------',
            '-------',
            '-------'];
    combiGagnante = [];
    $(".token").remove();

    game = true
}

function checkAnimatedToken() {
    if ($(".animatedToken").is(":animated") == false) {
        $(".animatedToken").removeClass().addClass(`token ${color}`)
    }
}

const checkAlign = () => {
    // VERTICAL 
    for (let j = 0; j < columns.length; j++) {
        if (columns[j].indexOf("rrrr") >= 0 || columns[j].indexOf("yyyy") >= 0) {
            let i = columns[j].indexOf("rrrr");
            for (let k = 0; k < 4; k++) {
                combiGagnante.push([i + k, j]);
            }
            return true
        }
    }
    // HORIZONTAL
    for (let i = 0; i < tableau.length; i++) {
        if (tableau[i].indexOf("rrrr") >= 0 || tableau[i].indexOf("yyyy") >= 0) {
            let j = tableau[i].indexOf("rrrr");
            for (let k = 0; k < 4; k++) {
                combiGagnante.push([i, j + k]);
            }
            return true
        }
    }
    // DIAGONAL
    let tableau2dim = tableau.map(ligne => ligne.split(''));
    for (let i = 0; i < tableau2dim.length; i++) {
        let ligne = tableau2dim[i];
        for (let j = 0; j < ligne.length; j++) {
            let current = ligne[j];
            // for (let k = 1; k < 4; k++) {
            //     eval(`
            //     window.forward${k} = getCase(tableau2dim, ${i}+${k}, j+${k});
            //     window.backward${k} = getCase(tableau2dim, ${i}+${k}, j-${k});`)
            // }
            let forward1 = getCase(tableau2dim, i + 1, j + 1);
            let forward2 = getCase(tableau2dim, i + 2, j + 2);
            let forward3 = getCase(tableau2dim, i + 3, j + 3);
            let backward1 = getCase(tableau2dim, i + 1, j - 1);
            let backward2 = getCase(tableau2dim, i + 2, j - 2);
            let backward3 = getCase(tableau2dim, i + 3, j - 3);

            if (current !== null && current !== '-' && current === forward1 && forward1 === forward2 && forward2 === forward3) {
                for (let k = 0; k < 4; k++) {
                    combiGagnante.push([i + k, j + k]);
                }
                return true;
            }
            else if (current !== null && current !== '-' && current === backward1 && backward1 === backward2 && backward2 === backward3) {
                for (let k = 0; k < 4; k++) {
                    combiGagnante.push([i + k, j - k]);
                }
                return true;
            }
        }
    }
};


const getCase = (tbl, i, j) => {
    if (tbl[i] && tbl[i][j]) {
        return tbl[i][j];
    } else {
        return null;
    }
};

$(".row").click(function () {
    if ($(".animatedToken").is(":animated") == false && game == true) {
        let rowClass = $(this).attr("class").split('');
        rowClass = rowClass[rowClass.length - 1] - 1
        if (heights[rowClass] > -37) {
            columns[rowClass] += color[0];
            let rowChange = tableau[columns[rowClass].length - 1].split('')
            rowChange[rowClass] = color[0];
            tableau[columns[rowClass].length - 1] = rowChange.join('')
            console.log(tableau.join('\n'))
            $(this).append('<div class="animatedToken"></div>')
            $(".animatedToken").css('background', color)
            $(".animatedToken").animate({ "top": `+=${heights[rowClass]}px` }, "slow");
            heights[parseInt(rowClass)] -= 100;
            //Verifie si le jeu est terminé
            if (checkAlign()) {
                console.log("gagné");
                for (let i = 0; i < 4; i++) {
                    let token = $('.r' + (combiGagnante[i][1] + 1) + ' > .token').eq(combiGagnante[i][0]);
                    token.css('border', '4px solid black');
                }
                game = false;
                $(".staticToken").remove();
            }
            if (color == "red") {
                color = "yellow";
            } else {
                color = "red";
            }
            $(".staticToken").css('background', color)
        }
        if (heights[rowClass] == -37) {
            $(".staticToken").remove();
            $("." + $(this).attr("class").split(' ')[1]).css('cursor', 'auto')
        }
    }
});


$('.row').hover(function () {
    if (game == true) {
        let rowClass = $(this).attr("class").split('');
        rowClass = rowClass[rowClass.length - 1] - 1

        if (heights[rowClass] > -37) {
            $(this).append('<div class="staticToken"></div>')
            $(".staticToken").css('background', color)
        }
    }
}, function () {
    $(".staticToken").remove();
});