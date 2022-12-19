function FirstReport(data){
    new Chart(document.getElementById('acquisitions'),{
          type: 'bar',
          data: {
            labels: data.map(row => row.plan),
            datasets: [
              {
                label: 'Cantidad de ventas por planes',
                data: data.map((row) => row.count),
              },
            ],
          },
        });
    
}