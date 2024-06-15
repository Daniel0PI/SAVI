import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Bool "mo:base/Bool";

import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
actor {
    type Profile = {
        username : Text;
        bio : Text;
    };
    type Sitio={
        sitioPrincipal: Principal;
        nombre: Text;
        latitud:Float;
        longitud:Float;
        descripcion: Text;
    };
     var sitios = HashMap.HashMap<Nat, Sitio>(1, Nat.equal, Hash.hash);

    stable var sitioIdCount : Nat = 0;

    public func createSitio (sitio : Sitio) : async () {
        
        //1. auth

        //2. Prepare data.
        let id : Nat = sitioIdCount;
        sitioIdCount+=1;

        //3. Create Sitio.
        sitios.put(id, sitio);

        //4. return confirmation.
        ();


    };

    public query func readSitio (id : Nat) : async ?Sitio {

        // 1. Auth

        //2. Query data.
        let sitioRes : ?Sitio = sitios.get(id);

        //3. Return requested Sitio or null.
        sitioRes;

    };
    
    public query func readAllSitios () : async [(Nat, Sitio)] {
        //1. authenticate

        //2. Hashmap to Iter.
            let sitiosIter : Iter.Iter<(Nat, Sitio)> = sitios.entries();
            
        //3. Iter to Array.
            let sitiosArray : [(Nat, Sitio)] = Iter.toArray(sitiosIter);

        //4. Iter to Array.
            sitiosArray;
    };

    
    public func removeSitio (id : Nat) : async Text {
        
        //1. Auth

        //2. Query data.
        let SitioRes : ?Sitio = sitios.get(id);
        
        //3. Validate if exists.
        switch (SitioRes) {
            case (null) {
                //3.1 Return "error".
                "You're trying to remove a non-existent Sitio.";
            };
            case (_) {

        //5. Remove Sitio.
                ignore sitios.remove(id);
        //6. Return Success.
                "Sitio has been succesfuly removed!";
            };
        };
    };
    type GetProfileError = {
        #userNotAuthenticated;
        #profileNotFound;
    };

    type GetProfileResponse = Result.Result<Profile, GetProfileError>;

    type CreateProfileError = {
        #profileAlreadyExists;
        #userNotAuthenticated;
    };

    type CreateProfileResponse = Result.Result<Bool, CreateProfileError>;

    let profiles = HashMap.HashMap<Principal, Profile>(0, Principal.equal, Principal.hash);

    public query ({caller}) func getProfile () : async GetProfileResponse {
        if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

        let profile = profiles.get(caller);

        switch profile {
            case (?profile) {
                #ok(profile);
            };
            case null {
                #err(#profileNotFound);
            };
        }
    };

    public shared ({caller}) func createProfile (username : Text, bio : Text) : async CreateProfileResponse {
        if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

        let profile = profiles.get(caller);

        if (profile != null) return #err(#profileAlreadyExists);

        let newProfile: Profile = {
            username = username;
            bio = bio;
        };
        
        profiles.put(caller, newProfile);

        #ok(true);
    };
}
