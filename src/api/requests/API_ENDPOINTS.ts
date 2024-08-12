const BASE = '/'
const AUTH = '/auth'
const PROFILE = '/profile'
const DREAMS = '/dreams'
const UPLOADS = '/uploads'


export const API_ENDPOINTS = {
    auth: {
        base: `${AUTH}`,
        me: `${AUTH}/me`,
        login: `${AUTH}/login`,
        logout: `${AUTH}/logout`,
        signup: `${AUTH}/signup`,
        deviceToken: `${AUTH}/device-token`,
        refreshToken: `${AUTH}/refresh-token`,
        updateProfile: `${AUTH}/update-profile`,
    },

    dream: {
        base: `${DREAMS}`,
        getDreams: `${DREAMS}`,
        stats: `${DREAMS}/stats`,
        analyzeDream: `${DREAMS}/analyze`,
        filterDreams: `${DREAMS}/paginate`,
        deleteDream: (id: string) => `${id}${DREAMS}`,
        addImage: (id: string) => `${DREAMS}/${id}/image`,
        getImage: (id: string) => `${DREAMS}/${id}/image`,
        updatePosition: (id: string) => `${DREAMS}/${id}`,
    },

    images: {
        base: (file: string) => `${UPLOADS}/${file}`,
        upload: `${UPLOADS}`,
    }
}