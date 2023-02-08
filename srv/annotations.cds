using ma_uiService as uiService from './s4btp-ca-mailappservices';

//Mail request annotation
@readonly
annotate uiService.mailrequests with {
    ID          @title : '{i18n>ID}';
    // req_no     @title : '{i18n>Req_No}'
    //            @readonly;
    sender      @title : '{i18n>Sender}';
    recipient   @title : '{i18n>Recipient}';
    subject     @title : '{i18n>Subject}';
    type        @title : '{i18n>Type}';
    body        @title : '{i18n>Body}'
                @UI.MultiLineText;
    attachments @title : '{i18n>Attachments}';
    status      @title : '{i18n>Status}';
    message     @title : '{i18n>Message}';
};

annotate uiService.mailrequests with @UI : {
    HeaderInfo          : {
        TypeName       : '{i18n>Request}',
        TypeNamePlural : '{i18n>Requests}',
        Title          : {Value : ID},
        Description    : {Value : subject}
    },
    SelectionFields     : [
        // req_no,
        sender,
        recipient,
        subject,
        status
    ],

    LineItem            : [
        {
            $Type             : 'UI.DataFieldForAction',
            Action            : 'ma_uiService.sendmail',
            Label             : 'Resend Mail',
            Inline            : true,
            ![@UI.Hidden]     : sendHidden,
            ![@UI.Importance] : #High
        },
        {
            $Type : 'UI.DataField',
            Value : sender
        },
        {
            $Type : 'UI.DataField',
            Value : recipient
        },
        {
            $Type : 'UI.DataField',
            Value : subject
        },
        {
            $Type : 'UI.DataField',
            Value : type
        },
        {
            $Type : 'UI.DataField',
            Value : body
        },
        {
            $Type             : 'UI.DataField',
            Value             : status,
            Criticality       : statusCriticality,
            ![@UI.Importance] : #High
        },
        {
            $Type : 'UI.DataField',
            Value : message
        },
    ],

    Facets              : [
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>Details}',
            Target : '@UI.FieldGroup#Details'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>Admin}',
            Target : '@UI.FieldGroup#Admin'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>Attachments}',
            Target : 'attachments/@UI.LineItem'
        }
    ],

    FieldGroup #Details : {Data : [
        {Value : sender},
        {Value : recipient},
        {Value : subject},
        {Value : type},
        {Value : body},
        {Value : status},
        {Value : message}
    ]},

    FieldGroup #Admin   : {Data : [
        {Value : ID},
        {Value : createdBy},
        {Value : createdAt},
        {Value : modifiedBy},
        {Value : modifiedAt}
    ]}

};

// Attachment annotation

annotate uiService.attachments with {
    ID           @title : '{i18n>ID}'
                 @readonly;
    name         @title : '{i18n>AttachmentName}';
    contentType  @title : '{i18n>AttachmentType}';
    contentBytes @UI.Hidden
};

annotate uiService.attachments with @UI : {
    HeaderInfo                    : {
        TypeName       : '{i18n>Attachment}',
        TypeNamePlural : '{i18n>Attachments}'
    },
    LineItem                      : [
        {
            $Type : 'UI.DataField',
            Value : name
        },
        {
            $Type : 'UI.DataField',
            Value : contentType
        }
    ],

    Facets                        : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>AttachmentDetails}',
        Target : '@UI.FieldGroup#AttachmentDetails'
    }],
    FieldGroup #AttachmentDetails : {Data : [
        {Value : name},
        {Value : contentType},
        {Value : contentBytes}
    ]}

};
