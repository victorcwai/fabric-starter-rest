const _ = require('lodash');
const fabricCLI = require('$/fabric-cli');
const ctUtils= require('../component-manager-utils')
const cfg = require('$/config.js');

class PeerComponentType {

    async deploy(bootstrap, component, env) {

        env = ctUtils.envWithDockerComposeProjectName(env, cfg.org)

        let cmd = `docker-compose -f docker-compose.yaml -f docker-compose-couchdb.yaml ${cfg.DOCKER_COMPOSE_EXTRA_ARGS} up `
            + ` -d --force-recreate --no-deps pre-install www.local couchdb.peer0 peer0 cli.peer post-install `;//www.peer
        let result = fabricCLI.execShellCommand(cmd, cfg.YAMLS_DIR, env);
        return result;
    }
}


module.exports = new PeerComponentType()