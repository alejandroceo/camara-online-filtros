const video = document.getElementById('video');
const constraints = {
    video: true
};

// Solicitar acceso a la cámara
async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
    } catch (err) {
        console.error('Error al acceder a la cámara: ', err);
    }
}

// Aplicar filtro al video
function applyFilter(filter) {
    const filterValue = filter !== 'none' ? `filter: ${filter}();` : ''; // Evitar 'filter: none;' en caso de filtro 'none'
    video.style.cssText = filterValue;
}

// Tomar una foto del video
function takePhoto() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Aplicar filtro al contexto del canvas
    context.filter = video.style.filter;

    // Dibujar el fotograma del video en el canvas (con el filtro aplicado)
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Obtener la URL de la imagen del canvas
    const url = canvas.toDataURL('image/png');

    // Crear un enlace temporal para descargar la imagen
    const link = document.createElement('a');
    link.href = url;
    link.download = 'foto.png';
    
    // Simular un clic en el enlace para descargar la imagen
    link.click();
}

// Inicializar la cámara y aplicar filtro predeterminado cuando la página se carga
window.onload = function() {
    initCamera();
    applyFilter('none'); // Filtro predeterminado al cargar la página
};
