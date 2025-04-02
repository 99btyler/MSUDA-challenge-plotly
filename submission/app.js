function init() {

    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((response) => {

        // build dropdown
        buildDropdown(response)

        // build metadata and charts with the first sample (id=940)
        buildMetadata(response["metadata"].find(sample => sample.id == 940))
        buildCharts(response["samples"].find(sample => sample.id == 940))

    })

}

function onOptionChanged(id) {

    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((response) => {

        // build metadata and charts with the selected sample (id=?)
        buildMetadata(response["metadata"].find(sample => sample.id == id))
        buildCharts(response["samples"].find(sample => sample.id == id))

    })

}

function buildDropdown(response) {

    let names = response["names"]
    let selDataset = d3.select("#selDataset")
    
    names.forEach(id => {
        selDataset.append("option").attr("value", id).text(`#${id}`)
    })

}

function buildMetadata(selectedSample) {

    let sampleMetadata = d3.select("#sample-metadata")

    // clear p elements
    sampleMetadata.html("")

    // fill p elements
    for (const key in selectedSample) {
        sampleMetadata.append("p").text(`${key}: ${selectedSample[key]}`)
    }

}

function buildCharts(selectedSample) {

    // bar chart
    let traceBar = {
        type: "bar",
        orientation: "h",
        x: selectedSample["sample_values"].slice(0, 10).reverse(),
        y: selectedSample["otu_ids"].slice(0, 10).map(id => `OTU ${id}`).reverse(),
        text: selectedSample["otu_labels"].slice(0, 10).reverse()
    }

    let layoutBar = {
        title: "Top 10 Bacterial Cultures Found",
        xaxis: {title:"Number of Bacteria"}
    }

    Plotly.newPlot("bar", [traceBar], layoutBar)

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

    let layoutBubble = {
        title: "Bacteria Cultures Per Sample",
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Number of Bacteria"},
        showlegend: false
    }

    Plotly.newPlot("bubble", [traceBubble], layoutBubble)

}

init()