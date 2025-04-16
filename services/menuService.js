import axios from "axios";

export const fetchMenuItems = async () => {

    try {
        const response = await axios.get(
            'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu.json'
        );

        const data = typeof response.data === 'string'
            ? JSON.parse(response.data)
            : response.data;

        return data.menu;
    } catch (error) {
        console.error('Failed to fetch menu items:', error);
        return [];
    }
}