// fakeApi.js
export const fetchImages = async (page = 1, limit = 20) => {
    // Simulating an API response with 100 sample images
    const totalImages = 100;
    const images = Array.from({ length: totalImages }, (_, i) => ({
      id: i + 1,
      imageUrl: `https://picsum.photos/200`,
      text: `Image Description ${i + 1}`,
    }));
  
    // Paginate the data
    const start = (page - 1) * limit;
    const end = start + limit;
  
    return {
      images: images.slice(start, end),
      total: totalImages,
      page,
      limit,
    };
  };
  