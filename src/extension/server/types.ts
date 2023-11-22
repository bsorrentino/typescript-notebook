/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type * as plotly from 'plotly.js';

export type Configuration = {
    registerTsNode: boolean;
    disablePseudoTerminal: boolean;
    inlineTensorflowVisualizations: boolean;
    injectTsVis: boolean;
    injectPlotly: boolean;
    terminalRows: number;
    terminalColumns: number;
};

type BaseMessage<T extends string, B = {}> = {
    type: T;
    requestId: string;
} & B;
export type CodeObject = {
    code: string;
    textDocumentVersion: number;
    sourceFilename: string;
    sourceTsFilename: string;
    friendlyName: string;
    sourceMapFilename: string;
};
export type RequestType =
    | RunCellRequest
    | PingRequest
    | InitializeRequest
    | TensorFlowVisRequest
    | PlotGenerated
    | ReadLineQuestionResponse;
export type RunCellRequest = BaseMessage<
    'cellExec',
    {
        code: CodeObject;
    }
>;

export type PingRequest = BaseMessage<'ping'>;
export type InitializeRequest = BaseMessage<'initialize'>;
export type TensorFlowVisRequest = BaseMessage<
    'tensorFlowVis',
    | { request: 'history'; requestId: string; success: boolean; error?: Error }
    | { request: 'barchart'; requestId: string; success: boolean; error?: Error }
    | { request: 'confusionMatrix'; requestId: string; success: boolean; error?: Error }
    | { request: 'scatterplot'; requestId: string; success: boolean; error?: Error }
    | { request: 'linechart'; requestId: string; success: boolean; error?: Error }
    | { request: 'histogram'; requestId: string; success: boolean; error?: Error }
    | { request: 'modelSummary'; requestId: string; success: boolean; error?: Error }
    | { request: 'layer'; requestId: string; success: boolean; error?: Error }
    | { request: 'valuesDistribution'; requestId: string; success: boolean; error?: Error }
    | { request: 'perclassaccuracy'; requestId: string; success: boolean; error?: Error }
    | { request: 'heatmap'; requestId: string; success: boolean; error?: Error }
>;

export type ReadLineQuestionRequest = BaseMessage<
    'readlineRequest',
    {
        question: string;
        requestId: string;
    }
>;

export type ReadLineQuestionResponse = BaseMessage<
    'readlineResponse',
    {
        answer?: string;
        requestId: string;
    }
>;

// Responses
export type ResponseType =
    | RunCellResponse
    | PingResponse
    | LogMessage
    | ReplRestarted
    | Initialized
    | OutputResponse
    | PlotGenerated
    | ReadLineQuestionRequest
    ;
export type LogMessage = BaseMessage<
    'logMessage',
    {
        message: string;
        category: 'info' | 'error';
    }
>;
export type RunCellResponse = BaseMessage<
    'cellExec',
    | {
          result?: DisplayData;
          success: true;
          start: number;
          end: number;
      }
    | {
          ex: Error | { name?: string; message?: string; stack?: string };
          success: false;
          start: number;
          end: number;
      }
>;
export type OutputResponse = BaseMessage<
    'output',
    {
        data?: DisplayData;
        ex?: Error | { name?: string; message?: string; stack?: string };
    }
>;
export type PingResponse = BaseMessage<'pong'>;
export type ReplRestarted = BaseMessage<'replRestarted'>;
export type Initialized = BaseMessage<'initialized'>;

// Data types
export type DisplayData =
    | TextOutput
    | Base64OrSVGImage
    | TensorData
    | ArrayData
    | JsonData
    | HtmlData
    | GeneratePlot
    | MarkdownData
    | MultiMimeOutput;
type MultiMimeOutput = BaseMessage<'multi-mime', { value: DisplayData[] }>;
type Base64OrSVGImage = BaseMessage<'image', { value: string; mime: string }>;
type TensorData = BaseMessage<'tensor', { value: any }>;
type ArrayData = BaseMessage<'array', { value: any }>;
type TextOutput = BaseMessage<'text', { value: string }>;
type JsonData = BaseMessage<'json', { value: any }>;
type HtmlData = BaseMessage<'html', { value: string }>;
type MarkdownData = BaseMessage<'markdown', { value: string }>;
export type GeneratePlot = BaseMessage<
    'generatePlot',
    {
        ele?: string;
        data: plotly.Data[];
        layout: plotly.Layout;
        hidden?: boolean;
        format?: 'png' | 'jpeg' | 'svg';
        download?: boolean;
    }
>;
type PlotGenerated = BaseMessage<
    'plotGenerated',
    { base64: string; success: true } | { base64: string; success: false; error: Error }
>;

