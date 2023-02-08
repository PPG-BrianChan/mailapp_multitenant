namespace mailapp;

using {
    cuid,
    managed
} from '@sap/cds/common';

@cds.persistence.exists:false
entity mailrequests : cuid, managed {
    sender : String;
    recipient : String;
    subject : String;
    type: String;
    body : String;
    attachments : Composition of many Attachments on attachments.parent = $self;
    status : String(1);
    message: String;
    virtual sendHidden        : Boolean;
    virtual statusCriticality : Integer;
}

@cds.persistence.exists:false
entity Attachments : cuid, managed {
    key parent       : Association to mailrequests;
        name         : String(200);
        contentType  : String(30);
        contentBytes : LargeString; // content bytes encoded in Base64
}

@cds.persistence.exists:false
entity whitelists : cuid, managed {
    addressArea : String;
}
