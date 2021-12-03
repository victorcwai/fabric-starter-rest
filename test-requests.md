

# Form-url-encoded POST

```bash
BOOTSTRAP_HOST=localhost:4000
ORG_HOST=remotehost:4000
#BOOTSTRAP_HOST=api.org1.example.com:4000


# Orderer TLS
curl http://${BOOTSTRAP_HOST}:4000/node/msp/orderer --output msp_orderer.tgz


MSP_FILE=msp_org2.tgz

# Get MSP archive:
curl http://${ORG_HOST}/node/msp --output ${MSP_FILE} 
#OR
tar czf msp_org2.tgz peerOrganizations ordererOrganizations


# Send integration request with certs:
curl -i --connect-timeout 30 --max-time 120 --retry 1 -k http://${BOOTSTRAP_HOST}/integration/service/orgs \
  -F peerName="peer0"  -F orgId="org2" -F domain="example.com" -F orgIp="192.168.99.128" -F peerPort="7051" -F wwwPort="80" \
  -F certFiles=@${MSP_FILE}
  

# Add org to channel (with certs)
JWT=`(curl -d '{"username":"user1","password":"pass"}' -H "Content-Type: application/json" http://${BOOTSTRAP_HOST}/users | tr -d '"')`

curl -i --connect-timeout 30 --max-time 120 --retry 1 -k http://${BOOTSTRAP_HOST}/channels/:channelId/orgs \
  -H "Authorization: Bearer $JWT" \
  -F peerName="peer0"  -F orgId="org2" -F domain="example.com" -F orgIp="192.168.99.128" -F peerPort="7051" -F wwwPort="80" \
  -F certFiles=@${MSP_FILE}

# Add org to consortium
/consortium/members


# Raft orderer
 
tar czf msp-orderer.tgz -C crypto-config/ordererOrganizations/example2.com/ msp

#sudo chown -R $USER crypto-config

curl -i -k  --connect-timeout 30 --max-time 240 --retry 0 \
  http://${BOOTSTRAP_HOST}/integration/service/raft  \
    -F ordererName=orderer -F domain=osn-org2 -F ordererPort=7050 -F wwwPort=80 -F ordererIp=192.168.1.23 \
    -F orgId=org2 -F certFiles=@msp-orderer.tgz \
    --output crypto-config/configtx/example2.com/genesis.pb
     


#
DNS
registerOrg '{"orgId":"test","domain":"domain2.com","orgIp":"192.1.1.1","peerPort":"7051"}'
```



# Multipart post
curl 'http://localhost:4000/chaincodes' -X POST  -H "Authorization: Bearer $JWT" --data-binary 


tar czf msp-orderer.tgz -C crypto-config/ordererOrganizations/ex2.com/ msp

curl -k -0 --connect-timeout 30 --max-time 240 --retry 0 \
  http://192.168.99.1:4000/integration/service/raft  \
    -F ordererName=orderer -F domain=ex2.com -F ordererPort=7050 -F wwwPort=8000 -F ordererIp=192.168.99.100 \
    -F orgId=org11 -F certFiles=@msp-orderer.tgz \
    --output crypto-config/configtx/ex2.com/genesis.pb



curl -i --connect-timeout 30 --max-time 120 --retry 1 -k http://localhost:4000/integration/service/orgs \
  -F peerName="peer0"  -F orgId="org2" -F domain="example.com" -F orgIp="192.168.99.100" -F peerPort="7051" -F wwwPort="80" \
  -F certFiles=@msp-org.tgz