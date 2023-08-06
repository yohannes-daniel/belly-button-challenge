// // Read the json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Make an empty list to store the values
d3.json(url).then(function (data) {
    console.log(data);

    // // Create the dropdown button to change the individual
    let dropDownMenu = d3.select("#selDataset");
    function createIDSelection() {
        let ids = data.names;
        for (let i = 0; i < ids.length; i++) {
            dropDownMenu.append('option').attr("value", `${ids[i]}`).text(`${ids[i]}`);
        }
    };
    createIDSelection();

    // Create the base charts
    let samplesData = data.samples;
    function createChart() {
        console.log("inside createchart");
        console.log(samplesData);

        let sampleNames = data.names;
        let firstSample = sampleNames[0];
        console.log("hi")
        console.log(firstSample)

        // // Use the optionChanged function
        // function optionChanged() {
        //     let sampleNames = dropDownMenu.property("value");
        //     let sampleChosen = null;
        //     for (let i=0; i<samplesData.length; i++) {
        //         if (samplesData[i].id == sampleNames) {
        //             return sampleChosen = samplesData[i].id;
        //         }
        //     }
        // };
        // dropDownMenu.on("change", optionChanged());


        // console.log(sampleChosen);

        // Gather data for charts
        let resultArray = samplesData.filter(sampleObj => sampleObj.id == firstSample);
        let result = resultArray[0];
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        
        // Plotting the bar chart
        let trace1 = {
            y: yticks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        }
        let barData = [trace1];
        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };
        Plotly.newPlot("bar", barData, barLayout);

        // Plotting the bubble chart
        var trace2 = {
            x: otu_ids.slice(0, 10),
            y: sample_values.slice(0, 10),
            text: otu_labels.slice(0, 10),
            mode: 'markers',
            marker: {
                color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)', 'rgb(239, 31, 31)',
                'rgb(255, 255, 54)', 'rgb(161, 161, 65)', 'rgb(102, 161, 0)', 'rgb(50, 62, 110)', 'rgb(84, 38, 176)'],
                size: Math.sqrt(sample_values.slice(0, 10)) * 10,
                sizeref: 2,
                sizemode: 'area'
            }
        };

        var dataset2 = [trace2];

        var layout2 = {
            showlegend: false,
            height: 600,
            width: 600,
            xaxis: "OTU ID"
        };
        Plotly.newPlot('bubble', dataset2, layout2);
    };
    createChart();
});