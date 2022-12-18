



function FirstReport(data){
    new Chart(document.getElementById('acquisitions'),{
          type: 'bar',
          data: {
            labels: data.map(row => row.month),
            datasets: [
              {
                label: 'Venta por Mes',
                data: data.map((row) => row.count),
              },
            ],
          },
        });
    
}