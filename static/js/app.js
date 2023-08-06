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
         
        let topSampleValues = [];
        let topOTUIds = [];

        // Sort the data in descending order of sample_values
        let sortedSampleValues = samplesData[0].sample_values.sort((a, b) => b - a);
        let sortedOTUIds = samplesData[0].otu_ids.sort((a, b) => b - a);

        // Store the top 10 sample_values and otu_ids of each individual
        topSampleValues.push(sortedSampleValues.slice(0, 10));
        topOTUIds.push(sortedOTUIds.slice(0, 10));
        
        console.log(topSampleValues);
        console.log(topOTUIds);

        // Convert OTU IDs into strings
        let topOTUIdsString = topOTUIds.toString();
        topOTUIdsString = topOTUIdsString.split(",")
        console.log(topOTUIdsString);

        for (let i=0; i<topOTUIdsString.length; i++) {
            topOTUIdsString[i] = `OTU ${topOTUIdsString[i]}`
        }

        let otuLabels = samplesData[0].otu_labels.slice(0, 10);
        otuLabels = otuLabels[0].replaceAll(";", " ");
        otuLabels = otuLabels.split(" ")
        console.log(otuLabels);

        // Plotting the bar chart data for the first individual
        let trace1 = [{
            x: topSampleValues,
            y: topOTUIdsString,
            type: 'bar',
            orientation: 'h'
        }];
        
        let dataset1 = [trace1];

        let layout1 = {
            title: "Top 10 Samples",
            xaxis: "Sample Values",
            yaxis: "OTU IDs"
        };

        Plotly.newPlot("bar", dataset1, layout1);

        // Plotting the bubble chart data for the first individual
        // var trace2 = {
        //     x: topOTUIds,
        //     y: topSampleValues,
        //     text: otuLabels.slice(0, 10),
        //     mode: 'markers'
        //     // marker: {
        //     //     //   color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        //     //     size: Math.sqrt(topSampleValues) * 10
        //     //     // sizeref: 2,
        //     //     // sizemode: 'area'
        //     // }
        // };
        // console.log(trace2.x);
        // console.log(trace2.y);
    
        // var dataset2 = [trace2];
    
        // var layout2 = {
        //     showlegend: false,
        //     height: 600,
        //     width: 600,
        //     xaxis: "OTU ID"
        // };
    
        // Plotly.newPlot('bubble', dataset2, layout2);
    };
    createChart();
});