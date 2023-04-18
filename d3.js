window.onload = () => {

    var width = 500;
    var height = 500;

    x_data = Array.from({
        length: 100
    }, () => Math.floor(Math.random() * 400));

    y_data = Array.from({
        length: 100
    }, () => Math.floor(Math.random() * 400));

    var data = []

    for (i = 0; i < x_data.length; i++) {
        data.push([x_data[i], y_data[i]])
    }

    var svgCanvas = d3.select("body").append("svg")
        .attr('width', width)
        .attr('height', height)
        .style('border-radius', '5px')
        .style('border', '1px solid black')

    var xscale = d3.scaleLinear()
        .domain([0, 400])
        .range([0, width - 100]);
    var yscale = d3.scaleLinear()
        .domain([400, 0])
        .range([0, width - 100]);

    var x_axis = d3.axisBottom()
        .scale(xscale);
    var y_axis = d3.axisLeft()
        .scale(yscale);

    svgCanvas.append("g")
        .attr("transform", "translate(51, 430)")
        .call(x_axis);
    svgCanvas.append("g")
        .attr("transform", "translate(50, 30)")
        .call(y_axis);

    var dots = svgCanvas.append("g").selectAll('dot').data(data)
    dots.enter().append('circle')
        .attr("cx", function (d) {
            return d[0] + 51
        })
        .attr("cy", function (d) {
            return d[1] + 30
        })
        .attr("r", 2)
        .style("fill", "red")
    var br = document.createElement("br")
    document.body.append(br)

    var svgPie = d3.select("body").append("svg")
        .attr('width', width)
        .attr('height', height)
        .style('border-radius', '5px')
        .style('border', '1px solid black')

    d3.csv('titanic.csv').then(function (data) {
        radius = Math.min(width, height) / 2
        var colors = ['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c', '#e41aff', '#e4aa99']
        var color = d3.scaleOrdinal(colors);
        g = svgPie.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        var desc = [
            'infant (0-3)',
            'toddler (3-5)',
            'child (5-12)',
            'teenager (12-18)',
            'adult (18-65)',
            'old (65+)',
            'unknown'
        ]
        pie_data = [0, 0, 0, 0, 0, 0, 0]
        for (var i = 0; i < data.length; i++) {

            age = data[i].Age;
            if (age.length == 0) {
                pie_data[6] = pie_data[6] + 1;
            } else if (age >= 0 && age < 3) {
                pie_data[0] = pie_data[0] + 1;
            } else if (age >= 3 && age < 5) {
                pie_data[1] = pie_data[1] + 1;
            } else if (age >= 5 && age < 11) {
                pie_data[2] = pie_data[2] + 1;
            } else if (age >= 12 && age < 18) {
                pie_data[3] = pie_data[3] + 1;
            } else if (age >= 18 && age < 65) {
                pie_data[4] = pie_data[4] + 1;
            } else if (age >= 65) {
                pie_data[5] = pie_data[5] + 1;
            } else {
                pie_data[6] = pie_data[6] + 1;
            }
        }

        console.log(pie_data)
        var pie = d3.pie();
        var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        var arcs = g.selectAll("arc")
            .data(pie(pie_data))
            .enter()
            .append("g")
            .attr("class", "arc")

        arcs.append("path")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", arc);

        // legend
        var ul = document.createElement('ul');

        for (i = 0; i < colors.length; i++) {
            var li = document.createElement('li');
            li.style.color = colors[i];
            li.innerText = desc[i] + " - " + pie_data[i];
            ul.appendChild(li);
        }
        document.body.append(ul)
    })

}