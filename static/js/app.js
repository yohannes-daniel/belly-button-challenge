// Read the json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Make an empty list to store the 


let jsonData = d3.json(url).then(function(data) {
    // console.log(data.samples[0]);

    // Sort the data in descending order of sample_values
    let descendOTUs = data.samples.sort(function compareFunction(first, second) {
        return second['sample_value'] - first['sample_value'];
    });
    console.log(descendOTUs);
    
    // Store the top 10 sample_values of each individual 
    let topSampleValues = [];
    let topOTUIds = [];
    let forCount = 0;
    for (let i = 0; i < descendOTUs.length; i++) {
        for (let a = 0; a < (forCount = descendOTUs[i].sample_values.length<10? descendOTUs[i].sample_values.length:10); a++) {
            topSampleValues.push(descendOTUs[i].sample_values[a]); 
        }
        for (let a = 0; a < (forCount = descendOTUs[i].otu_ids.length<10? descendOTUs[i].otu_ids.length:10); a++) {
            topOTUIds.push(descendOTUs[i].otu_ids[a]); 
        }
        
        
    }
    console.log(topSampleValues);
    console.log(topOTUIds);

    let dataset = {
        x: topSampleValues.slice(0, 10),
        y: topOTUIds.slice(0, 10),
        orientation: 'h'
    };

    Plotly.newPlot("bar", dataset);
});

// ------------------------------------------------------------------------------------------------------------------------------------

