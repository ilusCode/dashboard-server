import { Service } from '@angular/core';
import { CatalogAppResponse } from '../model/catalog-app-response';

@Service()
export class CatalogAppService {


    getApps(): Promise<CatalogAppResponse[]> {
        return Promise.resolve(
            [
                {
                    index: 0,
                    url: "http://truenas-scale.tail401370.ts.net",
                    name: "Iluscode Server",
                    description: "Iluscode Server is a web application that allows you to manage your projects and tasks.",
                    image: "truenas_preloader.svg"
                },
                {
                    index: 1,
                    url: "http://truenas-scale.tail401370.ts.net:30451",
                    name: "Sonatype Nexus Repository",
                    description: "Nexus Repository is an open source repository manager for maven, npm and many other package formats.",
                    image: "https://media.sys.truenas.net/apps/nexus/icons/icon.svg"
                },
                {
                    index: 2,
                    url: "http://truenas-scale.tail401370.ts.net:30013",
                    name: "Jellyfin",
                    description: "Jellyfin is a Free Software Media System that puts you in control of managing and streaming your media.",
                    image: "https://media.sys.truenas.net/apps/jellyfin/icons/icon.svg"
                },
                {
                    index: 3,
                    url: "",
                    name: "Tailscale",
                    description: "Tailscale Secure remote access to shared resources.",
                    image: "https://media.sys.truenas.net/apps/tailscale/icons/icon.png"
                },
                {
                    index: 4,
                    url: "",
                    name: "MongoDB",
                    description: "MongoDB is a document database designed for ease of application development and scaling.",
                    image: "https://media.sys.truenas.net/apps/mongodb/icons/icon.svg"
                },
                {
                    index: 5,
                    url: "",
                    name: "Redis",
                    description: "Redis. The open source, in-memory data store used by millions of developers as a database, cache, streaming engine, and message broker.",
                    image: "https://media.sys.truenas.net/apps/redis/icons/icon.png"
                },
                {
                    index: 6,
                    url: "http://truenas-scale.tail401370.ts.net:30017",
                    name: "Jenkins",
                    description: "Jenkins is an open source automation server which enables developers around the world to reliably build, test, and deploy their software.",
                    image: "https://media.sys.truenas.net/apps/jenkins/icons/icon.svg"
                },
                {
                    index: 7,
                    url: "http://truenas-scale.tail401370.ts.net:30360",
                    name: "Npmplus",
                    description: "Npmplus is a web application for managing npm packages.",
                    image: "https://media.sys.truenas.net/apps/npmplus/icons/icon.svg"
                }
            ]
        )
    }
}
