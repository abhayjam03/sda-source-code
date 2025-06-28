export const getCourses = async () => {
    const response = await fetch('/api/courses');
    return response.json();
}

export const getCourseById = async (id: string) => {
    const response = await fetch(`/api/courses/${id}`);
    return response.json();
}

export const getHeroSection = async () => {
    const response = await fetch('/api/hero');
    return response.json();
}

export const getFeatures = async () => {
    const response = await fetch('/api/features');
    return response.json();
}

export const getFeaturedCourses = async () => { 
    const response = await fetch('/api/featured-courses');
    return response.json();
}

export const getTestimonials = async () => {
    const response = await fetch('/api/testimonials');
    return response.json();
}

// Academy related functions
export const getAcademyInfo = async () => {
    const response = await fetch('/api/academy');
    return response.json();
}

export const updateAcademyInfo = async (data: any) => {
    const response = await fetch('/api/academy', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

// Forces related functions
export const getForces = async () => {
    const response = await fetch('/api/forces');
    return response.json();
}

export const getForceById = async (id: string) => {
    const response = await fetch(`/api/forces/${id}`);
    return response.json();
}

// Schools related functions
export const getSchools = async () => {
    const response = await fetch('/api/schools');
    return response.json();
}

export const getSchoolById = async (id: string) => {
    const response = await fetch(`/api/schools/${id}`);
    return response.json();
}

// User related functions
export const getUsers = async () => {
    const response = await fetch('/api/users');
    return response.json();
}

export const getUserById = async (id: string) => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}




