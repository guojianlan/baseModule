import { Controller, Get, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { generateClass, IModuleOrigin } from "src/adminModule";
import { Column, Entity, Repository } from "typeorm";

export const mixinAdminModule: ({ Controllers, Services, entities }: IModuleOrigin) => any = ({ Controllers, Services, entities }) => {
    console.log(Controllers, Services, entities)
    return {
        Controllers: {

        },
        Services: {

        },
        entities: {
            
        }

    }
}