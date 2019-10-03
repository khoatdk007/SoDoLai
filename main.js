function createGametes(genotype) {
    let genePairs = [];
    for (let i = 0; i < genotype.length; i += 2) {
        genePairs.push(genotype.substr(i, 2));
    }

    let temp = "0".repeat(genePairs.length);
    let result = [];
    let i;
    do {
        i = genePairs.length - 1;
        let str = "";
        for (let j = 0; j < genePairs.length; j++) {
            str += genePairs[j][parseInt(temp[j])];
        }
        if (!result.includes(str)) result.push(str);
        while ((i >= 0) && (temp[i] === "1")) i--;
        temp = temp.substr(0, i) + "1" + temp.substr(i + 1);
        for (var j = i + 1; j < genePairs.length; j++) temp = temp.substr(0, j) + "0" + temp.substr(j + 1);
    } while (i !== -1);
    return result;
}

function connectGametes(gamete1, gamete2) {
    if ((gamete1.length !== gamete2.length) ||
        (gamete1.toLowerCase !== gamete2.toLowerCase)) return -1;
    let result = "";
    for (let i = 0; i < gamete1.length; i++) {
        if (gamete1[i] < gamete2[i]) result += gamete1[i] + gamete2[i];
        else result += gamete2[i] + gamete1[i];
    }
    return result;
}
document.getElementById("lai").onclick = function () {
    const firstGametes = createGametes(document.getElementById("momGenotype").value);
    const secondGametes = createGametes(document.getElementById("dadGenotype").value);
    if (document.getElementById("momGenotype").value.toLowerCase() !== document.getElementById("dadGenotype").value.toLowerCase())
        return alert("Parents need to have the similar genotype");
    document.getElementById("momGametes").textContent = firstGametes.join(", ");
    document.getElementById("dadGametes").textContent = secondGametes.join(", ");
    let res = document.getElementById("resultTable");
    res.innerHTML = "";
    let columnTitle = document.createElement("tr");
    columnTitle.appendChild(document.createElement("td"));
    for (let i = 0; i < secondGametes.length; i++) {
        let td = columnTitle.insertCell(-1);
        td.textContent = secondGametes[i];
    }
    res.append(columnTitle);
    let childGenotypes = {};
    for (let i = 0; i < firstGametes.length; i++) {
        let tr = document.createElement("tr");
        let rowTitle = tr.insertCell(0);
        rowTitle.textContent = firstGametes[i];
        for (let j = 0; j < secondGametes.length; j++) {
            let td = tr.insertCell(-1);
            let newGenotype = connectGametes(firstGametes[i], secondGametes[j])
            td.textContent = newGenotype;
            if (childGenotypes[newGenotype] === undefined) {
                childGenotypes[newGenotype] = 1;
            } else childGenotypes[newGenotype] += 1;
        }
        res.appendChild(tr);
    }
    document.getElementById("genotypicRatio").textContent = Object.keys(childGenotypes).map(key => childGenotypes[key] + key).join(" : ");
}