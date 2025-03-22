import {Game} from '../utils/endpoint'

interface GamesResponse {
    games: Game[]
    hasMore: boolean
    totalGames: number
}

export const gamesService = {
    async getGames(page: number = 1, genre?: string): Promise<GamesResponse>{
        const url = genre ? `/api/games?genre=${genre}&page=${page}`:`/api/games?page=${page}`

        const response = await fetch(url)
        if(!response.ok){
            throw new Error('Failed to fetch games')
        }
        return response.json()
    }
}