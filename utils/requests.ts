const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties({ showFeatured = false } = {}) {
  try {
    if (!apiDomain) {
      [];
    }
    const res = await fetch(
      `${apiDomain}/properties?showFeatured=${showFeatured ? '/featured' : ''}`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch properties');
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchProperty(id: string) {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
