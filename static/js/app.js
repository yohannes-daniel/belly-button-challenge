// // Read the json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Make an empty list to store the values
// function optionChanged(sample) {
//     console.log(sample);

    // d3.json(url).then(function(data) {
    
    //     console.log(data);
    //     let samplesData = data.samples;
    //     console.log(samplesData);
    
    //     let ids = data.names;
    //     let dropDownMenu = d3.select("#selDataset");
    //     for (let i = 0; i < ids.length; i++) {
    //         dropDownMenu.append('option').attr("value", `${ids[i]}`).text(`${ids[i]}`);
    //     }
    
    //     console.log(data.names);
    //     let resultArray = samplesData.filter(sampleObj => sampleObj.id == individualID);
    //     let result = resultArray[0];
    //     let otu_ids = result.otu_ids;
    //     let otu_labels = result.otu_labels;
    //     let sample_values = result.sample_values;
    //     let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    
    //     // Plotting the bar chart
    //     let trace1 = {
    //         x: sample_values.slice(0, 10).reverse(),
    //         y: yticks,
    //         text: otu_labels.slice(0, 10).reverse(),
    //         type: "bar",
    //         orientation: "h",
    //     }
    //     let barData = [trace1];
    //     let barLayout = {
    //         title: "Top 10 Bacteria Cultures Found",
    //         margin: { t: 30, l: 150 }
    //     };
    //     Plotly.newPlot("bar", barData, barLayout);
    
    //     // Plotting the bubble chart
    //     var trace2 = {
    //         x: otu_ids.slice(0, 10),
    //         y: sample_values.slice(0, 10),
    //         text: otu_labels.slice(0, 10),
    //         mode: 'markers',
    //         marker: {
    //             color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)', 'rgb(239, 31, 31)',
    //                 'rgb(255, 255, 54)', 'rgb(161, 161, 65)', 'rgb(102, 161, 0)', 'rgb(50, 62, 110)', 'rgb(84, 38, 176)'],
    //             size: Math.sqrt(sample_values.slice(0, 10)) * 10,
    //             sizeref: 2,
    //             sizemode: 'area'
    //         }
    //     };
    
    //     var bubbleData = [trace2];
    
    //     var layout2 = {
    //         showlegend: false,
    //         height: 600,
    //         width: 600,
    //         xaxis: { title: "OTU ID" }
    //     };
    //     Plotly.newPlot('bubble', bubbleData, layout2);
    
    // });
// };

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
};

function buildMetadata(newSample) {
    console.log(newSample);

    d3.json(url).then(function(data) {
        console.log(data);
        // Filter the data for the object with the desired sample number
        let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        let samplesData = data.metadata;
        console.log(samplesData);

        let ids = data.names;
        let dropDownMenu = d3.select("#sample-metadata");
        for (key in result){
            dropDownMenu.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };
    });
};

function buildCharts(newSample) {
    d3.json(url).then(function(data) {
    
        console.log(data);
        let samplesData = data.samples;
        console.log(samplesData);
    
        let ids = data.names;
        let dropDownMenu = d3.select("#selDataset");
        for (let i = 0; i < ids.length; i++) {
            dropDownMenu.append('option').attr("value", `${ids[i]}`).text(`${ids[i]}`);
        }
    
        console.log(data.names);
        let resultArray = samplesData.filter(sampleObj => sampleObj.id == newSample);
        let result = resultArray[0];
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    
        // Plotting the bar chart
        let trace1 = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
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
    
        var bubbleData = [trace2];
    
        var layout2 = {
            showlegend: false,
            height: 600,
            width: 600,
            xaxis: { title: "OTU ID" }
        };
        Plotly.newPlot('bubble', bubbleData, layout2);
    
    });
}


// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

