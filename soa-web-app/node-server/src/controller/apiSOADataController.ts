// Copyright 2020 Luis Blazquez Miñambres (@luisblazquezm), Miguel Cabezas Puerto (@MiguelCabezasPuerto), Óscar Sánchez Juanes (@oscarsanchezj) and Francisco Pinto-Santos (@gandalfran)
// See LICENSE for details.

"use strict";

import * as Request from "request";
import * as Express from "express";

import { ApiSOADataModel } from "../model/apiSOADataModel";
import {  STATUS_OK,  STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR, CONTENT_APPLICATION_JSON } from "../util";

/** Retrieves results from API */
export class ApiSOADataController{

    /** 
    * COVID data model.
    */
    private static apiSOADataModel: ApiSOADataModel = new ApiSOADataModel();

    /** 
    * Register the controller's endpoints.
    * @param application - the express aplication.
    */
    public registerController(application: Express.Express): any {
        application.post("/data/topics", this.topics.bind(this));
        application.post("/data/covid/world", this.covid.bind(this));
        application.post("/data/covid/barcelona", this.covidBarcelona.bind(this));
    }

    /** 
    * Retrieves the covid data.
    * @param request - the express request.
    * @param response - the express response.
    */
    public async covid(request: Express.Request, response: Express.Response) {

        // retrieve data
        let result = null;
        try{
            result = await ApiSOADataController.apiSOADataModel.covid();
        }catch(e){
            response.status(STATUS_INTERNAL_SERVER_ERROR);
            response.contentType(CONTENT_APPLICATION_JSON);
            response.json({'error': 'unkown error'});
            return;
        }

        if(result === null){
            response.status(STATUS_INTERNAL_SERVER_ERROR);
        }else{
            response.status(STATUS_OK);
            response.contentType(CONTENT_APPLICATION_JSON);
            response.json(result);
        }
    }
    
    /** 
    * Retrieves the Barcelona covid data.
    * @param request - the express request.
    * @param response - the express response.
    */
    public async covidBarcelona(request: Express.Request, response: Express.Response) {

        // retrieve data
        let result = null;
        try{
            result = await ApiSOADataController.apiSOADataModel.covidBarcelona();
        }catch(e){
            response.status(STATUS_INTERNAL_SERVER_ERROR);
            response.contentType(CONTENT_APPLICATION_JSON);
            response.json({'error': 'unkown error'});
            return;
        }

        if(result === null){
            response.status(STATUS_INTERNAL_SERVER_ERROR);
        }else{
            response.status(STATUS_OK);
            response.contentType(CONTENT_APPLICATION_JSON);
            response.json(result);
        }
    }

    /** 
    * Retrieves the topics data.
    * @param request - the express request.
    * @param response - the express response.
    */
    public async topics(request: Express.Request, response: Express.Response) {

        // retrieve data
        let result = null;
        try{
            result = await ApiSOADataController.apiSOADataModel.topics();
        }catch(e){
            response.status(STATUS_INTERNAL_SERVER_ERROR);
            response.contentType(CONTENT_APPLICATION_JSON);
            response.json({'error': 'unkown error'});
            return;
        }

        if(result === null){
            response.status(STATUS_INTERNAL_SERVER_ERROR);
        }else{
            response.status(STATUS_OK);
            response.contentType(CONTENT_APPLICATION_JSON);
            response.json(result);
        }
    }
}