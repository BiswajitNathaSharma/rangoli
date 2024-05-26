export default function artistsName(artists){
    return artists.primary.map(artist => artist.name).join(', ')
}