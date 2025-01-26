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

        let selectedSample = response["samples"].find(sample => sample.id == id)

        // bar chart
        let traceBar = {
            type: "bar",
            orientation: "h",
            x: selectedSample["sample_values"].slice(0, 10).reverse(),
            y: selectedSample["otu_ids"].slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: selectedSample["otu_labels"].slice(0, 10).reverse()
        }
        let dataBar = [traceBar]

        let layoutBar = {
            title: "Top 10 Bacterial Cultures Found",
            xaxis: {title:"Number of Bacteria"}
        }

        Plotly.newPlot("bar", dataBar, layoutBar)

        // bubble chart
        let traceBubble = {
            mode: "markers",
            marker: {
                size: selectedSample["sample_values"],
                color: selectedSample["otu_ids"],
                colorscale: "Earth"
            },
            x: selectedSample["otu_ids"],
            y: selectedSample["sample_values"],
            text: selectedSample["otu_labels"]
        }
        let dataBubble = [traceBubble]

        let layoutBubble = {
            title: "Bacteria Cultures Per Sample",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Number of Bacteria"},
            showlegend: false
        }

        Plotly.newPlot("bubble", dataBubble, layoutBubble)

    })

}

function buildMetadata(sample) {

    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

        // ...

    })

}

init()