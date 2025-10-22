import { Input } from '@/components/ui/input'
import React from 'react'
import SearchResult from './SearchResult'

const SearchImage = () => {
    return (
        <div>
            <Input
                id="imageName"
                name="imageName"
                placeholder="Search for docker hub public image.."
            />
            <SearchResult
                data={data}
            />
        </div>
    )
}

export default SearchImage








const data: {
    star_count: number;
    is_official: boolean;
    name: string;
    is_automated: boolean;
    description: string;
}[] = [
        {
            "star_count": 14034,
            "is_official": true,
            "name": "node",
            "is_automated": false,
            "description": "Node.js is a JavaScript-based platform for server-side and networking applications."
        },
        {
            "star_count": 83,
            "is_official": false,
            "name": "bitnami/node",
            "is_automated": false,
            "description": "Bitnami Secure Image for node"
        },
        {
            "star_count": 135,
            "is_official": false,
            "name": "circleci/node",
            "is_automated": false,
            "description": "Node.js is a JavaScript-based platform for server-side and networking applications."
        },
        {
            "star_count": 25,
            "is_official": false,
            "name": "cimg/node",
            "is_automated": false,
            "description": "The CircleCI Node.js Docker Convenience Image."
        },
        {
            "star_count": 116,
            "is_official": false,
            "name": "kindest/node",
            "is_automated": false,
            "description": "https://sigs.k8s.io/kind node image"
        },
        {
            "star_count": 2,
            "is_official": false,
            "name": "okteto/node",
            "is_automated": false,
            "description": ""
        },
        {
            "star_count": 1,
            "is_official": false,
            "name": "chainguard/node",
            "is_automated": false,
            "description": "Build, ship and run secure software with Chainguard's low-to-zero CVE container images."
        },
        {
            "star_count": 3,
            "is_official": false,
            "name": "sitespeedio/node",
            "is_automated": false,
            "description": "Node base template"
        },
        {
            "star_count": 1,
            "is_official": false,
            "name": "eclipse/node",
            "is_automated": false,
            "description": "Node 0.12.9"
        },
        {
            "star_count": 0,
            "is_official": false,
            "name": "corpusops/node",
            "is_automated": false,
            "description": "https://github.com/corpusops/docker-images/"
        },
        {
            "star_count": 0,
            "is_official": false,
            "name": "rootpublic/node",
            "is_automated": false,
            "description": ""
        },
        {
            "star_count": 3,
            "is_official": false,
            "name": "ubuntu/node",
            "is_automated": false,
            "description": "Ubuntu-based Node.js image for server-side and networking applications."
        },
        {
            "star_count": 0,
            "is_official": false,
            "name": "setupphp/node",
            "is_automated": false,
            "description": "Docker images to run setup-php GitHub Action "
        },
        {
            "star_count": 12,
            "is_official": false,
            "name": "activestate/node",
            "is_automated": false,
            "description": "ActiveState's customizable, low-to-no vulnerability container image for node."
        },
        {
            "star_count": 1,
            "is_official": false,
            "name": "joxit/node",
            "is_automated": false,
            "description": "Slim node docker with some utils for dev"
        },
        {
            "star_count": 5,
            "is_official": false,
            "name": "alpine/node",
            "is_automated": false,
            "description": ""
        },
        {
            "star_count": 2,
            "is_official": false,
            "name": "treehouses/node",
            "is_automated": false,
            "description": ""
        },
        {
            "star_count": 0,
            "is_official": false,
            "name": "vmware/node",
            "is_automated": false,
            "description": "Node.js base built on top of Photon OS"
        },
        {
            "star_count": 0,
            "is_official": false,
            "name": "wayofdev/node",
            "is_automated": false,
            "description": ""
        },
        {
            "star_count": 0,
            "is_official": false,
            "name": "vulhub/node",
            "is_automated": false,
            "description": ""
        },
        {
            "star_count": 0,
            "is_official": false,
            "name": "systemsdk/node",
            "is_automated": false,
            "description": "Docker environment with node 16 for Laravel/Symfony (based on official node docker hub repository)."
        },
        {
            "star_count": 0,
            "is_official": false,
            "name": "openizr/node",
            "is_automated": false,
            "description": "Safer, non-root, nodeJS environment"
        },
        {
            "star_count": 0,
            "is_official": false,
            "name": "openeuler/node",
            "is_automated": false,
            "description": ""
        },
        {
            "star_count": 26,
            "is_official": false,
            "name": "presearch/node",
            "is_automated": false,
            "description": "Run a search node in Presearch's decentralized search engine at https://presearch.com"
        },
        {
            "star_count": 28,
            "is_official": false,
            "name": "iron/node",
            "is_automated": false,
            "description": "Tiny Node image"
        }
    ]