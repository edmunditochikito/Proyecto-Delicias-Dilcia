document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.post("/ReportesPOST");
        const data = response.data;
        console.log(data);

        const clientesLabels = data.clientes_mas_piden.map(item => item.Nombre);
        const clientesData = data.clientes_mas_piden.map(item => item.cantidad);

        const clientesChartCtx = document.getElementById('clientesChart').getContext('2d');
        new Chart(clientesChartCtx, {
            type: 'bar',
            data: {
                labels: clientesLabels,
                datasets: [{
                    label: 'Gasto total',
                    data: clientesData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const platillosLabels = data.platillos_mas_piden.map(item => item.Nombre);
        const platillosData = data.platillos_mas_piden.map(item => item.cantidad);

        const platillosChartCtx = document.getElementById('platillosChart').getContext('2d');
        new Chart(platillosChartCtx, {
            type: 'bar',
            data: {
                labels: platillosLabels,
                datasets: [{
                    label: 'Cantidad de pedidos',
                    data: platillosData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
