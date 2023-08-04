// Read the json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Make an empty list to store the 
let jsonData = d3.json(url).then(function(data) {
    // Sort the data in descending order of sample_values
    let descendOTUs = data.samples.sort(function compareFunction(first, second) {
        return second['sample_values'][0] - first['sample_values'][0];
    });
    console.log(descendOTUs);
    
    // Store the top 10 sample_values and otu_ids of each individual 
    let topSampleValues = [];
    let topOTUIds = [];

    for (let i = 0; i < descendOTUs.length; i++) {
        let sortedSampleValues = descendOTUs[i].sample_values.sort((a, b) => b - a);
        let sortedOTUIds = descendOTUs[i].otu_ids.sort((a, b) => b - a);

        topSampleValues.push(sortedSampleValues.slice(0, 10));
        topOTUIds.push(sortedOTUIds.slice(0, 10));
    }

    console.log(topSampleValues);
    console.log(topOTUIds);

    // Plotting the data for the first individual
    let trace = [{
        x: topSampleValues[0][0],
        y: topOTUIds[0][0],
        type: 'bar',
        orientation: 'h'
    }];

    let dataset = [trace];

    let layout = {
        title: "Top 10 Samples",
        xaxis: "Sample Values",
        yaxis: "OTU IDs"
    };
    
    Plotly.newPlot('bar', dataset, layout);
});