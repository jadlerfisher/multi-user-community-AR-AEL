/**
 * Create a model, given the model is predefined.
 */
AFRAME.registerComponent('create-model', {
  dependencies: ['position', 'rotation', 'scale', 'material'],
  schema: {
    models: {
      type: 'array',
      required: true
    },
    currentModel: {
      type: 'string',
      required: true
    }
  },

  init: function () {
    const el = this.el;
    var self = this;

    for (var i = 0; i < this.data.models.length; i++) {

      var modelSchema = {
        template: this.data.models[i],
        components: [
          'position', 'rotation', 'scale', 'material',
          {
            selector: '.model',
            component: 'material',
            property: 'color'
          }
        ]
      };
      NAF.schemas.add(modelSchema);
    }

    NAF.options.compressSyncPackets = true;
    NAF.options.updateRate = 1;

    // el.addEventListener(this.data.event, function(evt){
    //
    //   var targetEl = evt.detail.intersectedEl;
    //   var targetElClass = targetEl.getAttribute('class');
    //
    //   if(!targetElClass || targetElClass !== 'checkpoint'){
    //     var worldPos = evt.detail.intersection.point;
    //     const pos = AFRAME.utils.clone(worldPos);
    //
    //     pos.x   = Math.floor(pos.x / self.data.x) * self.data.x;
    //     pos.y = Math.floor(pos.y / self.data.y) * self.data.y;
    //     pos.z = Math.floor(pos.z / self.data.z) * self.data.z;
    //
    //     // NAF.entities.createNetworkEntity(self.data.currenttemplate, pos, '0 0 0');
    //
    //     // var spawnEl = NAF.entities.createNetworkEntity(self.data.currenttemplate, pos, '0 0 0');
    //     // NAF.utils.whenEntityLoaded(spawnEl, function() {
    //     //   var spawnEvent = new CustomEvent('spawnEvent', {'detail': {
    //     //     target: spawnEl
    //     //   }});
    //     //   el.dispatchEvent(spawnEvent);
    //     // });
    //   }
    // });
  }
});
