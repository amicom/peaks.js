/**
 * @file
 *
 * Defines the {@link SvgWaveformZoomView} class.
 *
 * @module waveform-zoomview
 */

define([
  './waveform-shape',
  'd3-selection'
], function(
  WaveformShape,
  Selector) {
  'use strict';

  /**
   * Creates a zoomable waveform view.
   *
   * @class
   * @alias SvgWaveformZoomView
   *
   * @param {WaveformData} waveformData
   * @param {HTMLElement} container
   * @param {Peaks} peaks
   */

  function SvgWaveformZoomView(waveformData, container, peaks) {
    var self = this;

    self._originalWaveformData = waveformData;
    self._container = container;
    self._peaks = peaks;

    // TODO: bind event handlers here (line 51)

    // Register event handlers here (line 62)

    self._enableAutoScroll = true;
    self._amplitudeScale = 1.0;

    self._options = peaks.options;

    self._data = null;
    self._pixelLength = 0;

    var initialZoomLevel = self._options.zoomLevels[peaks.zoom.getZoom()];

    self._zoomLevelAuto = false;
    self._zoomLevelSeconds = null;

    self._resizeTimeoutId = null;
    // self._resampleData({ scale: initialZoomLevel });

    self._width = container.clientWidth;
    self._height = container.clientHeight || self._options.height;

    // The pixel offset of the current frame being displayed
    self._frameOffset = 0;

    self._stage = Selector.select(container).append('svg')
    .attr('width', self._width)
    .attr('height', self._height);

    self._waveformLayer = self._stage.append('g');
    self._createWaveform();
  }

  SvgWaveformZoomView.prototype._createWaveform = function() {
    this._waveformShape = new WaveformShape({
      color: this._options.zoomWaveformColor,
      view: this
    });

    // this._waveformLayer.add(this._waveformShape);
    // this._stage.add(this._waveformLayer);

    // this._peaks.emit('zoomview.displaying', 0, this.pixelsToTime(this._width));
  };

  SvgWaveformZoomView.prototype._resampleData = function(options) {
    this._data = this._originalWaveformData.resample(options);
    this._scale = this._data.scale;
    this._pixelLength = this._data.length;
  };

    /**
   * @returns {Number} The start position of the waveform shown in the view,
   *   in pixels.
   */

  SvgWaveformZoomView.prototype.getFrameOffset = function() {
    return this._frameOffset;
  };

  SvgWaveformZoomView.prototype.getWidth = function() {
    return this._width;
  };

  /**
   * @returns {Number} The height of the view, in pixels.
   */

  SvgWaveformZoomView.prototype.getHeight = function() {
    return this._height;
  };

    /**
   * @returns {WaveformData} The view's waveform data.
   */

  SvgWaveformZoomView.prototype.getWaveformData = function() {
    return this._data;
  };

  return SvgWaveformZoomView;
});
