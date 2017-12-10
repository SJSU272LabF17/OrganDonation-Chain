/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.organchain.Setup} setup - the Setup transaction
 * @transaction
 */
function setup(setup) {
    
        var factory = getFactory();
        var NS = 'org.organchain';
    
        // create the donor
        var donor = factory.newResource(NS, 'Donor', 'D123');
        donor.address = 'test address';
        donor.firstName = "firstname";
        donor.lastName = "lastname";
        donor.ssn = "123-11-1111";
        donor.age = 12;
        donor.email = "test@gmail.com";
        donor.zip = 12345;
    
        // create the Unos
        var unos = factory.newResource(NS, 'Unos', '00001');
    
        // create the source hospital
        var sourceHospital = factory.newResource(NS, 'Hospital', 'sHospital123');
        sourceHospital.name = "washington hospital";
        sourceHospital.email = "hospital@gmail.com";
        sourceHospital.address = "address";

        // create the target hospital
        var destHospital = factory.newResource(NS, 'Hospital', 'tHospital123');
        destHospital.name = "target hospital";
        destHospital.email = "hospital@gmail.com";
        destHospital.address = "target address";
    
        // create the recipient
        var recipient = factory.newResource(NS, 'Recipient', 'R_001');
        recipient.hospital = factory.newRelationship(NS, 'Hospital', 'tHospital123');
        recipient.name = "recipient";
        recipient.age = 12;
        recipient.email = "recipient@gmail.com";
        recipient.organName = "liver";
        recipient.address = "recipient address";

        // create the organ
        // var organ = factory.newResource(NS, 'Organ', 'Organ_001');
        // organ.organName = "liver";
        // organ.donor = factory.newRelationship(NS, 'Donor', 'D123');
        // o Status status
      
        // organ.type = 'BANANAS';
        // shipment.status = 'IN_TRANSIT';
        // shipment.unitCount = 5000;
        // shipment.contract = factory.newRelationship(NS, 'Contract', 'CON_001');

        return getParticipantRegistry(NS + '.Donor')
            .then(function (donorRegistry) {
                // add the donor
                return donorRegistry.addAll([donor]);
            })
            .then(function() {
                return getParticipantRegistry(NS + '.Unos');
            })
            .then(function(unosRegistry) {
                // add the unos
                return unosRegistry.addAll([unos]);
            })
            .then(function() {
                return getParticipantRegistry(NS + '.Hospital');
            })
            .then(function(hospitalRegistry) {
                // add the hospital
                return hospitalRegistry.addAll([sourceHospital]);
            })
            .then(function() {
                return getParticipantRegistry(NS + '.Hospital');
            })
            .then(function(hospitalRegistry) {
                // add the hospital
                return hospitalRegistry.addAll([destHospital]);
            })
            .then(function() {
                return getParticipantRegistry(NS + '.Recipient');
            })
            .then(function(recipientRegistry) {
                // add the hospital
                return recipientRegistry.addAll([recipient]);
            })
}

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.organchain.Offered} offered - the offered Organ details
 * @transaction
 */
function Offered(offered) {
        // create the organ
        var factory = getFactory();
        var NS = 'org.organchain';
		var newOrgan = factory.newResource(NS, 'Organ', offered.organId);
        newOrgan.organName = offered.organName;
        newOrgan.donor = offered.donor;
        newOrgan.status = "OFFERED";
        return getAssetRegistry(NS + '.Organ')
        .then(function (organRegistry) {
            // add the donor
            return organRegistry.addAll([newOrgan]);
        });
}    

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.organchain.Tested} data - the offered Organ details
 * @transaction
 */
function Tested(data) {
    // create the organ
    var factory = getFactory();
    var NS = 'org.organchain';
    var organ = data.organ;
    var testInfo = data.organTestInfo;

    var hospitalId = data.hospital.$identifier;
    organ.sourceHospital = data.hospital;
    organ.organTestInfo = testInfo;
    organ.status = "TESTED";
    return getAssetRegistry(NS + '.Organ')
    .then(function (organRegistry) {
        // add the donor
        return organRegistry.update(organ);
    });
}    

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.organchain.Matched} data - the matched Organ details
 * @transaction
 */
function Matched(data) {
    // create the organ
    var factory = getFactory();
    var NS = 'org.organchain';
    var organ = data.organ;

    var hospitalId = data.hospital.$identifier;
    organ.destHospital = data.hospital;
    organ.recipient = data.recipient;
    organ.status = "MATCHED";
    return getAssetRegistry(NS + '.Organ')
    .then(function (organRegistry) {
        // add the donor
        return organRegistry.update(organ);
    });
}    

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.organchain.Transplant} data - the matched Organ details
 * @transaction
 */
function Transplant(data) {
    // create the organ
    var factory = getFactory();
    var NS = 'org.organchain';
    var organ = data.organ;

    organ.status = "TRANSPLANT";
    return getAssetRegistry(NS + '.Organ')
    .then(function (organRegistry) {
        // add the donor
        return organRegistry.update(organ);
    });
}    




