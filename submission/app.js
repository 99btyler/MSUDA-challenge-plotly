function init() {

    // add data to dropdown
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((response) => {

        let names = response["names"]

        let select = d3.select("#selDataset")
        names.forEach(id => {
            select.append("option").attr("value", id).text(`#${id}`)
        })

        // create charts with the first entry
        buildCharts(response["samples"][0]["id"])
        buildMetadata()

    })

}

function onOptionChanged(value) {

    buildCharts(value)
    buildMetadata()

}

function buildCharts(id) {

    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((response) => {

        // bar chart
        let selectedSample = response["samples"].find(sample => sample.id == id)

        let trace = {
            type: "bar",
            orientation: "h",
            x: selectedSample["sample_values"].slice(0, 10).reverse(),
            y: selectedSample["otu_ids"].slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: selectedSample["otu_labels"].slice(0, 10).reverse()
        }
        let data = [trace]

        let layout = {
            title: "Top 10 Bacterial Cultures Found",
            xaxis: {title:"Number of Bacteria"}
        }

        Plotly.newPlot("bar", data, layout)

        // bubble chart
        // ...

    })

}

function buildMetadata(sample) {

    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

        // ...

    })

}

init()