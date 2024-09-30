export class TattooArtistWithSamePhoneNumber extends Error{
    constructor(){
        super("Phone already register")
    }
}